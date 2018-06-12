# Iframe Loader


```html
<div class="mkc-placeholder" data-source="2017-elections-presidentielles" data-height="75"></div>

<div class="mkc-placeholder" data-source="2015-elections-departementales" data-height="50" data-dpt="31"></div>

<script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return; js = d.createElement(s); js.id = id;
js.async=true; js.src = "//makinacorpus.github.io/iframe-loader/dist/scripts/mkc.js";
fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'makina-loader'));</script>
```
## Mettre en ligne un nouveau build
Les commits sont fait sur master *(ou sur une branche puis merge-request vers master)*. Une fois le code pret à livrer *(+ master distant à jour)*, basculer sur `gh-pages` puis :

1. `git merge master`
2. `gulp`
3. `git commit` avec pour commentaire une référence aux principales évolutions depuis le précédent build.
4. `git push origin gh-pages`

### Important
__Ne pas__ *merge back* `gh-pages` dans `master` !
