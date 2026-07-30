# Nuclear Physics lecture notes (PDF)

Drop PDF files into this folder to publish them on the website.

## How to upload a new note

1. Copy your PDF into this directory, for example:
   ```bash
   cp /path/to/Lecture16.pdf downloads/nuclearphysics/
   ```
2. Commit and push to GitHub:
   ```bash
   git add downloads/nuclearphysics/
   git commit -m "Add nuclear physics lecture PDF"
   git push
   ```
3. After GitHub Pages rebuilds, the file appears automatically on  
   **https://bharatiop.github.io/lecture-notes/**  
   (Nuclear Physics section).

## Naming tips

Use clear names without spaces if possible:

- `PH5001_Nuclear_Particle_Physics_Notes.pdf`
- `Lecture12_Shell_Model.pdf`
- `PH5202_Nuclear_Physics_Syllabus.pdf`

Spaces work but are less convenient in links.

## Do not delete

Keep this `README.md` so the folder stays tracked by git even when empty of PDFs.
