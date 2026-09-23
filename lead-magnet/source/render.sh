cd "$(dirname "$0")"
mkdir -p prev
node build.cjs && "/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=15000 --print-to-pdf="$(cygpath -w "$PWD")\guide.pdf" "file:///$(cygpath -m "$PWD")/guide.html" 2>/dev/null
python -c "
import pymupdf as f
d=f.open('guide.pdf'); print('pages',len(d))
print(sorted(set(x[3].split('+')[-1] for p in d for x in p.get_fonts())))
W,H=4,2
for s in range(0,len(d),8):
    sheet=f.open(); pg=sheet.new_page(width=W*300,height=H*425)
    for k in range(8):
        i=s+k
        if i>=len(d): break
        pg.show_pdf_page(f.Rect((k%W)*300,(k//W)*425,(k%W)*300+298,(k//W)*425+423),d,i)
    pg.get_pixmap(dpi=110).save(f'prev/sheet{s//8}.png')
"
