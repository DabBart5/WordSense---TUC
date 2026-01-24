import json
import tkinter as tk
from tkinter import ttk, messagebox
from pathlib import Path

class B2SpeedEditor:
    def __init__(self, filename):
        self.filename = filename
        self.data = []
        
        # 1. LOAD DATA
        try:
            self.data = self.load_data()
            print(f"Loaded {len(self.data)} entries.") # Debug info in console
        except Exception as e:
            # Create a basic window just to show the error
            temp_root = tk.Tk()
            temp_root.withdraw()
            messagebox.showerror("Loading Error", f"Could not read {filename}.\n\nError: {e}")
            return

        if not self.data:
            messagebox.showwarning("Empty File", f"The file '{filename}' was found but contains no data.")
            return

        # 2. FIND PROGRESS
        self.current_index = 0
        for i, entry in enumerate(self.data):
            if not entry.get('reviewed'):
                self.current_index = i
                break
        
        # 3. START UI
        self.root = tk.Tk()
        self.root.title(f"B2 Speed Editor - {filename}")
        self.root.geometry("1000x850")

        self.setup_ui()
        self.bind_keys()
        self.load_word()
        self.root.mainloop()

    def load_data(self):
        p = Path(self.filename)
        if not p.exists():
            raise FileNotFoundError(f"Missing file: {self.filename}")
        
        with open(self.filename, "r", encoding="utf-8") as f:
            content = f.read().strip()
            if not content: return []
            
            # AUTO-DETECTION LOGIC
            if content.startswith('['):
                # Standard JSON List format
                return json.loads(content)
            else:
                # JSONL (line-by-line) format
                return [json.loads(line) for line in content.splitlines() if line.strip()]

    def sync_ui_to_memory(self):
        """Grabs text from screen and updates current index in self.data"""
        if not hasattr(self, 'ex_widgets') or self.current_index >= len(self.data):
            return

        entry = self.data[self.current_index]
        entry['word'] = self.word_edit.get().strip()
        entry['definition'] = self.def_text.get("1.0", "end-1c").strip()
        entry['pronunciation'] = self.pron_entry.get().strip()
        entry['wordType'] = self.type_entry.get().strip()
        
        new_ex = []
        for box in self.ex_widgets:
            txt = box.get("1.0", "end-1c").strip()
            if txt: new_ex.append(txt)
        entry['exSentence'] = new_ex

    def setup_ui(self):
        # Header area
        top = ttk.Frame(self.root, padding=10, relief="raised")
        top.pack(fill="x")
        
        ttk.Label(top, text="Word:", font=("Arial", 10)).pack(side="left")
        self.word_edit = ttk.Entry(top, font=("Arial", 20, "bold"), width=15)
        self.word_edit.pack(side="left", padx=10)

        info_f = ttk.Frame(top)
        info_f.pack(side="left", padx=20)
        ttk.Label(info_f, text="Type:").grid(row=0, column=0, sticky="e")
        self.type_entry = ttk.Entry(info_f, width=15)
        self.type_entry.grid(row=0, column=1)
        ttk.Label(info_f, text="Pron:").grid(row=1, column=0, sticky="e")
        self.pron_entry = ttk.Entry(info_f, width=15)
        self.pron_entry.grid(row=1, column=1)

        self.progress_label = ttk.Label(top, text="-- / --", font=("Arial", 12))
        self.progress_label.pack(side="right")

        # Scrollable area
        container = ttk.Frame(self.root)
        container.pack(fill="both", expand=True)
        self.canvas = tk.Canvas(container, bg="#f0f0f0")
        self.scrollbar = ttk.Scrollbar(container, orient="vertical", command=self.canvas.yview)
        self.scroll_frame = ttk.Frame(self.canvas)
        self.scroll_frame.bind("<Configure>", lambda e: self.canvas.configure(scrollregion=self.canvas.bbox("all")))
        self.canvas.create_window((0, 0), window=self.scroll_frame, anchor="nw")
        self.canvas.configure(yscrollcommand=self.scrollbar.set)
        self.canvas.pack(side="left", fill="both", expand=True)
        self.scrollbar.pack(side="right", fill="y")
        self.root.bind_all("<MouseWheel>", lambda e: self.canvas.yview_scroll(int(-1*(e.delta/120)), "units"))

        # Nav Footer
        nav = ttk.Frame(self.root, padding=10)
        nav.pack(fill="x")
        tk.Button(nav, text="TRASH [Del]", command=self.delete_word, bg="#e74c3c", fg="white").pack(side="left")
        self.jump_entry = ttk.Entry(nav, width=8)
        self.jump_entry.pack(side="left", padx=10)
        ttk.Button(nav, text="Go", command=self.jump_to_word).pack(side="left")
        
        tk.Button(nav, text="SAVE & NEXT [Ctrl+→]", command=self.save_and_next, bg="#27ae60", fg="white", font=("Arial", 10, "bold")).pack(side="right")
        tk.Button(nav, text="PREV [Ctrl+←]", command=self.prev_word).pack(side="right", padx=10)

    def load_word(self):
        for widget in self.scroll_frame.winfo_children(): widget.destroy()
        if not self.data or self.current_index >= len(self.data):
            self.word_edit.delete(0, "end")
            self.word_edit.insert(0, "DONE")
            return
        
        entry = self.data[self.current_index]
        self.progress_label.config(text=f"{self.current_index + 1} / {len(self.data)}")
        
        self.word_edit.delete(0, "end")
        self.word_edit.insert(0, entry.get('word', ''))
        self.type_entry.delete(0, "end")
        self.type_entry.insert(0, entry.get('wordType', ''))
        self.pron_entry.delete(0, "end")
        self.pron_entry.insert(0, entry.get('pronunciation', ''))

        # Definition
        def_f = ttk.LabelFrame(self.scroll_frame, text="Definition", padding=10)
        def_f.pack(fill="x", padx=20, pady=10)
        self.def_text = tk.Text(def_f, height=5, wrap="word", font=("Verdana", 10))
        self.def_text.insert("1.0", entry.get('definition', ''))
        self.def_text.pack(fill="x")

        # Examples
        ex_f = ttk.LabelFrame(self.scroll_frame, text="Examples", padding=10)
        ex_f.pack(fill="x", padx=20, pady=10)
        self.ex_widgets = []
        
        # Ensure it is a list
        exs = entry.get('exSentence', [])
        if isinstance(exs, str): exs = [exs]
        
        for i, ex in enumerate(exs):
            row = tk.Frame(ex_f, bg="white", pady=2)
            row.pack(fill="x", pady=2)
            box = tk.Text(row, height=2, wrap="word", font=("Verdana", 9))
            box.insert("1.0", ex)
            box.pack(side="left", fill="x", expand=True)
            tk.Button(row, text="X", fg="red", command=lambda idx=i: self.remove_ex(idx)).pack(side="right")
            self.ex_widgets.append(box)

        ttk.Button(ex_f, text="+ Add Example", command=self.add_ex).pack(anchor="e")
        self.def_text.focus_set()

    def remove_ex(self, idx):
        self.sync_ui_to_memory()
        self.data[self.current_index]['exSentence'].pop(idx)
        self.load_word()

    def add_ex(self):
        self.sync_ui_to_memory()
        self.data[self.current_index].setdefault('exSentence', []).append("")
        self.load_word()

    def save_and_next(self):
        self.sync_ui_to_memory()
        self.data[self.current_index]['reviewed'] = True
        self.save_to_disk()
        self.current_index += 1
        if self.current_index < len(self.data):
            self.load_word()
            self.canvas.yview_moveto(0)

    def save_to_disk(self):
        with open(self.filename, "w", encoding="utf-8") as f:
            json.dump(self.data, f, indent=4, ensure_ascii=False)

    def delete_word(self):
        if messagebox.askyesno("Delete", "Delete this word?"):
            self.data.pop(self.current_index)
            self.save_to_disk()
            self.load_word()

    def prev_word(self):
        self.sync_ui_to_memory()
        if self.current_index > 0:
            self.current_index -= 1
            self.load_word()

    def jump_to_word(self):
        try:
            self.sync_ui_to_memory()
            t = int(self.jump_entry.get()) - 1
            if 0 <= t < len(self.data):
                self.current_index = t
                self.load_word()
        except: pass

    def bind_keys(self):
        self.root.bind("<Control-Right>", lambda e: self.save_and_next())
        self.root.bind("<Control-Return>", lambda e: self.save_and_next())
        self.root.bind("<Control-Left>", lambda e: self.prev_word())
        self.root.bind("<Delete>", lambda e: self.delete_word())

if __name__ == "__main__":
    # Change this to "dictionary_ranked.jsonl" to edit your other file!
    B2SpeedEditor("./wordsense/TestProjekt/db/B2withPhonetics.json")