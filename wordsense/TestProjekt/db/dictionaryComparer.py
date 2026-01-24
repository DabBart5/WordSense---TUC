import json
import tkinter as tk
from tkinter import ttk, messagebox
from pathlib import Path
import os
import sys

# --- WORKING DIRECTORY FIX ---
script_dir = Path(sys.argv[0]).parent.absolute()
os.chdir(script_dir)

class C2ProEditor:
    def __init__(self, c2_file, dict_file):
        self.c2_file = c2_file
        self.dict_file = dict_file
        
        # 1. LOAD DATA
        self.c2_data = self.load_json(c2_file)
        self.big_dict = self.load_jsonl_to_map(dict_file)
        
        if not self.c2_data:
            messagebox.showerror("Error", f"Could not load {c2_file}")
            return

        # 2. FIND PROGRESS
        self.current_index = 0
        for i, entry in enumerate(self.c2_data):
            if not entry.get('reviewed'):
                self.current_index = i
                break
        
        # 3. UI SETUP
        self.root = tk.Tk()
        self.root.title("C2 Definition & Example Picker")
        self.root.geometry("1200x950")
        
        # Defining Word Type Options
        self.word_types = ["noun", "verb", "adjective", "adverb", "preposition", "conjunction", "pronoun", "interjection", "idiom", "phrase"]

        self.setup_ui()
        self.load_word()
        self.root.mainloop()

    def load_json(self, filename):
        if not Path(filename).exists(): return []
        with open(filename, "r", encoding="utf-8") as f:
            return json.load(f)

    def load_jsonl_to_map(self, filename):
        mapping = {}
        if not Path(filename).exists(): return {}
        with open(filename, "r", encoding="utf-8") as f:
            for line in f:
                if line.strip():
                    item = json.loads(line)
                    mapping[item['word'].lower()] = item
        return mapping

    def sync_to_memory(self):
        """Captures current screen state into the data list before navigating."""
        if self.current_index >= len(self.c2_data): return
        
        entry = self.c2_data[self.current_index]
        entry['word'] = self.word_var.get().strip()
        entry['definition'] = self.active_def_box.get("1.0", "end-1c").strip()
        entry['wordType'] = self.type_combo.get().strip()
        entry['pronunciation'] = self.pron_entry.get().strip()
        entry['transitivity'] = self.trans_var.get()
        entry['exSentence'] = [w.get("1.0", "end-1c").strip() for w in self.ex_widgets if w.get("1.0", "end-1c").strip()]

    def setup_ui(self):
        # Top Panel
        top = ttk.Frame(self.root, padding=10, relief="raised")
        top.pack(fill="x")
        
        self.word_var = tk.StringVar()
        tk.Entry(top, textvariable=self.word_var, font=("Arial", 22, "bold"), bd=0, bg="#f0f0f0").pack(side="left", padx=10)
        
        details = ttk.Frame(top)
        details.pack(side="left", padx=20)
        
        # ENUM/COMBOBOX for Word Type
        ttk.Label(details, text="Type:").grid(row=0, column=0)
        self.type_combo = ttk.Combobox(details, values=self.word_types, width=12)
        self.type_combo.grid(row=0, column=1)
        
        ttk.Label(details, text="Pron:").grid(row=1, column=0)
        self.pron_entry = ttk.Entry(details, width=12)
        self.pron_entry.grid(row=1, column=1)

        self.trans_var = tk.BooleanVar()
        tk.Checkbutton(top, text="Transitive", variable=self.trans_var).pack(side="left", padx=10)

        self.prog_label = ttk.Label(top, text="0/0", font=("Arial", 12))
        self.prog_label.pack(side="right")

        paned = ttk.PanedWindow(self.root, orient="horizontal")
        paned.pack(fill="both", expand=True)

        # LEFT SIDE: ACTIVE EDITING
        self.left_frame = ttk.Frame(paned, padding=10)
        paned.add(self.left_frame, weight=1)

        # RIGHT SIDE: CANDIDATES
        self.right_container = ttk.Frame(paned, padding=10)
        paned.add(self.right_container, weight=1)
        
        self.canvas = tk.Canvas(self.right_container, bg="#dfe6e9")
        scrollbar = ttk.Scrollbar(self.right_container, orient="vertical", command=self.canvas.yview)
        self.scroll_frame = ttk.Frame(self.canvas)
        self.scroll_frame.bind("<Configure>", lambda e: self.canvas.configure(scrollregion=self.canvas.bbox("all")))
        self.canvas.create_window((0, 0), window=self.scroll_frame, anchor="nw")
        self.canvas.configure(yscrollcommand=scrollbar.set)
        self.canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

        # Footer
        bottom = ttk.Frame(self.root, padding=10)
        bottom.pack(fill="x")
        tk.Button(bottom, text="DELETE", bg="#ff7675", command=self.delete_word).pack(side="left")
        
        # Navigation Buttons
        tk.Button(bottom, text="SAVE & NEXT [Ctrl+Right]", bg="#2ecc71", font=("Arial", 11, "bold"), command=self.save_and_next).pack(side="right")
        tk.Button(bottom, text="BACK [Ctrl+Left]", command=self.prev_word, width=15).pack(side="right", padx=10)
        
        # Keybinds
        self.root.bind("<Return>", lambda e: self.save_and_next())
        self.root.bind("<Control-Right>", lambda e: self.save_and_next())
        self.root.bind("<Control-Left>", lambda e: self.prev_word())
        self.root.bind("<Delete>", lambda e: self.delete_word())

    def load_word(self):
        for w in self.left_frame.winfo_children(): w.destroy()
        for w in self.scroll_frame.winfo_children(): w.destroy()

        if self.current_index < 0: self.current_index = 0
        if self.current_index >= len(self.c2_data):
            self.word_var.set("DONE")
            return

        entry = self.c2_data[self.current_index]
        word_str = entry.get('word', '')
        self.word_var.set(word_str)
        
        # Setting the Combobox value
        w_type = entry.get('wordType', '').lower()
        self.type_combo.set(w_type if w_type in self.word_types else "")
        
        self.pron_entry.delete(0, 'end')
        self.pron_entry.insert(0, entry.get('pronunciation', ''))
        self.trans_var.set(entry.get('transitivity', False))
        self.prog_label.config(text=f"{self.current_index + 1} / {len(self.c2_data)}")

        # --- LEFT SIDE CONTENT ---
        tk.Label(self.left_frame, text="ACTIVE DEFINITION", font=("Arial", 10, "bold")).pack(anchor="w")
        self.active_def_box = tk.Text(self.left_frame, height=6, font=("Verdana", 10), wrap="word")
        self.active_def_box.insert("1.0", entry.get('definition', ''))
        self.active_def_box.pack(fill="x", pady=(0, 20))

        tk.Label(self.left_frame, text="ACTIVE EXAMPLES", font=("Arial", 10, "bold")).pack(anchor="w")
        self.active_ex_container = ttk.Frame(self.left_frame)
        self.active_ex_container.pack(fill="both", expand=True)
        self.ex_widgets = []
        for ex in entry.get('exSsentence', []):
            self.add_active_ex_widget(ex)

        ttk.Button(self.left_frame, text="+ New Blank Example", command=lambda: self.add_active_ex_widget("")).pack(anchor="e")

        # --- RIGHT SIDE CANDIDATES ---
        dict_entry = self.big_dict.get(word_str.lower())
        if dict_entry:
            for d_idx, d in enumerate(dict_entry.get('definitions', [])):
                f = tk.Frame(self.scroll_frame, bg="white", pady=10, padx=10, bd=1, relief="ridge")
                f.pack(fill="x", pady=5, padx=5)
                
                d_head = tk.Frame(f, bg="white")
                d_head.pack(fill="x")
                tk.Label(d_head, text=f"DICT {d_idx+1} [{d['pos']}]", font=("Arial", 8, "bold"), bg="white").pack(side="left")
                tk.Button(d_head, text="USE DEF", command=lambda t=d['definition'], p=d['pos']: self.use_definition(t, p), bg="#81ecec", font=("Arial", 7)).pack(side="right")
                
                tk.Label(f, text=d['definition'], wraplength=450, justify="left", bg="white", font=("Verdana", 9)).pack(fill="x", pady=5)

                if d.get('examples'):
                    for ex_txt in d['examples']:
                        ex_f = tk.Frame(f, bg="#f1f2f6", pady=2)
                        ex_f.pack(fill="x", pady=1)
                        tk.Label(ex_f, text="• " + ex_txt, wraplength=380, justify="left", bg="#f1f2f6", font=("Verdana", 8, "italic")).pack(side="left", padx=5)
                        tk.Button(ex_f, text="USE EX", command=lambda t=ex_txt: self.add_active_ex_widget(t), bg="#fab1a0", font=("Arial", 7)).pack(side="right")
        else:
            tk.Label(self.scroll_frame, text="No match in dictionary_sorted.jsonl", pady=20).pack()

    def add_active_ex_widget(self, text):
        row = tk.Frame(self.active_ex_container)
        row.pack(fill="x", pady=2)
        box = tk.Text(row, height=2, font=("Verdana", 9), wrap="word")
        box.insert("1.0", text)
        box.pack(side="left", fill="x", expand=True)
        tk.Button(row, text="✕", fg="red", command=lambda: self.remove_ex_widget(row, box)).pack(side="right")
        self.ex_widgets.append(box)

    def remove_ex_widget(self, row, box):
        self.ex_widgets.remove(box)
        row.destroy()

    def use_definition(self, text, pos):
        self.active_def_box.delete("1.0", "end")
        self.active_def_box.insert("1.0", text)
        p = pos.lower()
        self.type_combo.set(p if p in self.word_types else "")

    def save_and_next(self):
        self.sync_to_memory()
        self.c2_data[self.current_index]['reviewed'] = True
        self.save_to_disk()
        self.current_index += 1
        self.load_word()
        self.canvas.yview_moveto(0)

    def prev_word(self):
        """Moves backward while syncing changes."""
        if self.current_index > 0:
            self.sync_to_memory()
            self.save_to_disk()
            self.current_index -= 1
            self.load_word()
            self.canvas.yview_moveto(0)

    def save_to_disk(self):
        with open(self.c2_file, "w", encoding="utf-8") as f:
            json.dump(self.c2_data, f, indent=4, ensure_ascii=False)

    def delete_word(self):
        self.c2_data.pop(self.current_index)
        self.save_to_disk()
        self.load_word()

if __name__ == "__main__":
    C2ProEditor("A1.json", "dictionary_sorted.jsonl")