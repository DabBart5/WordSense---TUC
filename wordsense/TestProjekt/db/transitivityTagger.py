import json
import tkinter as tk
from tkinter import messagebox, ttk
from pathlib import Path
import os
import sys

# Ensure the script looks in its own directory
script_dir = Path(sys.argv[0]).parent.absolute()
os.chdir(script_dir)

class C1ProTagger:
    def __init__(self, filename):
        self.filename = filename
        self.all_data = []
        self.verb_indices = [] 
        self.current_verb_idx = 0 
        
        self.word_types = ["verb", "noun", "adjective", "adverb", "phrase", "idiom"]

        try:
            with open(self.filename, 'r', encoding='utf-8') as f:
                self.all_data = json.load(f)
        except Exception as e:
            root = tk.Tk()
            root.withdraw()
            messagebox.showerror("Error", f"Could not load {filename}: {e}")
            sys.exit()

        self.refresh_index_list()

        self.root = tk.Tk()
        self.root.title(f"C1 Pro Tagger: {filename}")
        self.root.geometry("800x600")
        self.root.configure(bg="#2d3436")

        self.setup_ui()
        self.bind_keys()
        self.refresh_view()
        self.root.mainloop()

    def refresh_index_list(self):
        """Re-scans the file to find all current verbs."""
        self.verb_indices = [i for i, entry in enumerate(self.all_data) 
                            if entry.get('wordType', '').lower() == 'verb']

    def setup_ui(self):
        # Header
        self.info_label = tk.Label(self.root, text="", font=("Arial", 10), fg="#b2bec3", bg="#2d3436")
        self.info_label.pack(pady=5)

        # Word
        self.word_label = tk.Label(self.root, text="", font=("Arial", 36, "bold"), fg="#fab1a0", bg="#2d3436")
        self.word_label.pack(pady=10)

        # Type Selection (Dropdown)
        type_frame = tk.Frame(self.root, bg="#2d3436")
        type_frame.pack(pady=5)
        tk.Label(type_frame, text="Word Type: ", fg="white", bg="#2d3436").pack(side="left")
        self.type_combo = ttk.Combobox(type_frame, values=self.word_types, state="readonly", width=15)
        self.type_combo.pack(side="left")
        self.type_combo.bind("<<ComboboxSelected>>", lambda e: self.change_type())

        # Examples Area
        tk.Label(self.root, text="EXAMPLES:", font=("Arial", 9, "bold"), fg="#636e72", bg="#2d3436").pack(anchor="w", padx=50)
        self.ex_text = tk.Text(self.root, height=5, font=("Verdana", 10), bg="#353b48", fg="#dfe6e9", 
                               wrap="word", bd=0, padx=10, pady=10)
        self.ex_text.pack(fill="x", padx=50, pady=5)

        # Transitivity Status
        self.status_label = tk.Label(self.root, text="", font=("Arial", 18, "bold"), bg="#2d3436")
        self.status_label.pack(pady=15)

        # Legend
        help_text = "[T] Transitive (True) | [F] Intransitive (False) | [Space] Toggle\n[Del] Delete Word | [Type Keys: 1=Verb, 2=Noun, 3=Adj]\n[Arrows] Navigate | [S] Save"
        tk.Label(self.root, text=help_text, font=("Courier", 10), fg="#b2bec3", bg="#2d3436").pack(side="bottom", pady=20)

    def bind_keys(self):
        self.root.bind("<Right>", lambda e: self.navigate(1))
        self.root.bind("<Left>", lambda e: self.navigate(-1))
        self.root.bind("t", lambda e: self.set_trans(True))
        self.root.bind("f", lambda e: self.set_trans(False))
        self.root.bind("<space>", lambda e: self.toggle_trans())
        self.root.bind("<Delete>", lambda e: self.delete_current())
        self.root.bind("s", lambda e: self.save_data())
        # Quick Type Switching
        self.root.bind("1", lambda e: self.quick_set_type("verb"))
        self.root.bind("2", lambda e: self.quick_set_type("noun"))
        self.root.bind("3", lambda e: self.quick_set_type("adjective"))

    def refresh_view(self):
        if not self.verb_indices:
            self.word_label.config(text="NO VERBS LEFT")
            return

        original_idx = self.verb_indices[self.current_verb_idx]
        entry = self.all_data[original_idx]
        
        self.info_label.config(text=f"Verb {self.current_verb_idx + 1} of {len(self.verb_indices)} (Index: {original_idx + 1})")
        self.word_label.config(text=entry.get('word', '').upper())
        self.type_combo.set(entry.get('wordType', ''))
        
        # Display Examples
        exs = entry.get('exSentence', [])
        self.ex_text.config(state="normal")
        self.ex_text.delete("1.0", "end")
        self.ex_text.insert("1.0", "\n\n".join([f"• {ex}" for ex in exs]))
        self.ex_text.config(state="disabled")

        is_trans = entry.get('transitivity', False)
        self.status_label.config(
            text="TRANSITIVE (True)" if is_trans else "INTRANSITIVE (False)",
            fg="#55efc4" if is_trans else "#ff7675"
        )

    def navigate(self, direction):
        if not self.verb_indices: return
        self.current_verb_idx = (self.current_verb_idx + direction) % len(self.verb_indices)
        self.refresh_view()

    def set_trans(self, val):
        if not self.verb_indices: return
        original_idx = self.verb_indices[self.current_verb_idx]
        self.all_data[original_idx]['transitivity'] = val
        self.save_data(silent=True)
        self.navigate(1)

    def toggle_trans(self):
        if not self.verb_indices: return
        idx = self.verb_indices[self.current_verb_idx]
        self.set_trans(not self.all_data[idx].get('transitivity', False))

    def quick_set_type(self, new_type):
        self.type_combo.set(new_type)
        self.change_type()

    def change_type(self):
        if not self.verb_indices: return
        original_idx = self.verb_indices[self.current_verb_idx]
        new_type = self.type_combo.get()
        self.all_data[original_idx]['wordType'] = new_type
        
        # If it's no longer a verb, refresh the list and move to next
        if new_type != 'verb':
            self.refresh_index_list()
            if self.current_verb_idx >= len(self.verb_indices):
                self.current_verb_idx = 0
        self.save_data(silent=True)
        self.refresh_view()

    def delete_current(self):
        if not self.verb_indices: return
        if messagebox.askyesno("Delete", "Permanently delete this word from file?"):
            original_idx = self.verb_indices[self.current_verb_idx]
            self.all_data.pop(original_idx)
            self.refresh_index_list()
            if self.current_verb_idx >= len(self.verb_indices):
                self.current_verb_idx = 0
            self.save_data()
            self.refresh_view()

    def save_data(self, silent=False):
        try:
            with open(self.filename, 'w', encoding='utf-8') as f:
                json.dump(self.all_data, f, indent=4, ensure_ascii=False)
            if not silent: self.root.title(f"C1 Pro Tagger: SAVED")
        except Exception as e:
            messagebox.showerror("Save Error", str(e))

if __name__ == "__main__":
    C1ProTagger("A1.json")