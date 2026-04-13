Resume download
----------------
The site ships `pooja-lakshmi-resume.docx` from your project (Word / ATS-friendly for many parsers).

To use a PDF instead:
1. Export from Word: File → Save As → PDF.
2. Save as `pooja-lakshmi-resume.pdf` in this `public/` folder.
3. In `src/config/profile.js`, set `resumeFileName` to `"pooja-lakshmi-resume.pdf"`.

The Hero button uses Vite's base URL so downloads work on GitHub Pages (/YourRepo/...).
