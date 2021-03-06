# Gulp сборщик. Версия с Pug + Sass/SCSS

Сборка основана на [Gulppack](https://github.com/andreyalexeich/gulppack-pug). Из описания Gulppack: сборка для автоматизации задач в повседневной front-end разработке. Компилируйте SCSS и Pug, сжимайте файлы, оптимизируйте картинки, пишите на ES6. При  каждом сохранении файла в редакторе кода браузер автоматически перезагружает страницу. Не волнуйтесь о том, что вам придётся выполнять рутинную работу.

## Что включает в себя сборка?
* [browser-sync](https://browsersync.io/docs/gulp) - живая перезагрузка веб-страницы при внесении изменений в файлы вашего проекта;
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) — автоматически расставляет префиксы в CSS в соответствии с сервисом [Can I Use](https://caniuse.com/);
* [gulp-babel](https://www.npmjs.com/package/gulp-babel) - использование ES6 с [Babel](https://babeljs.io/);
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) — минификация JS-файлов;
* [gulp-pug](https://www.npmjs.com/package/gulp-pug) — компиляция Pug в HTML;
* [gulp-sass](https://www.npmjs.com/package/gulp-sass) — компиляция Sass/SCSS в CSS;
* [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) — минификация CSS-файлов;
* [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) - карта стилей;
* [gulp-concat](https://www.npmjs.com/package/gulp-concat) - объединение файлов;
* [gulp-add-src](https://www.npmjs.com/package/gulp-add-src) — добавление файлов для объединения;
* [gulp-rename](https://www.npmjs.com/package/gulp-rename) — переименование файлов, добавление суффиксов и префиксов (например, добавление суффикса .min к минифицированным файлам);
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) — сжатие изображений PNG, JPG, GIF и SVG;
* [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant) — дополнение к gulp-imagemin для работы с PNG-изображениями;
* [imagemin-jpeg-recompress](https://www.npmjs.com/package/imagemin-jpeg-recompress) — дополнение к gulp-imagemin для работы с JPG-изображениями;
* [gulp-favicons](https://github.com/evilebottnawi/favicons) — генератор фавиконок для вашего проекта;
* [gulp-svg-sprite](https://www.npmjs.com/package/gulp-svg-sprite) — создание SVG-спрайтов;
* [gulp-replace](https://www.npmjs.com/package/gulp-replace) - замена строк в исходных файлах;
* [gulp-newer](https://www.npmjs.com/package/gulp-newer) — дополнительный плагин к ```gulp-imagemin```, позволяет сжимать только новые изображения;
* [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) — оповещения в командной строке (например, ошибки в Sass/SCSS);
* [gulp-debug](https://www.npmjs.com/package/gulp-debug) — отладка в терминале;
* [gulp-watch](https://www.npmjs.com/package/gulp-watch) — отслеживание изменений в ваших файлах проекта;
* [gulp-clean](https://www.npmjs.com/package/gulp-clean) — удаление файлов и папок.

## Как развернуть?

* [NPM](https://nodejs.org/) или [Yarn](https://yarnpkg.com/en/docs/install) (рекомендуется, гораздо быстрее) должен быть установлен;
* ```gulp``` должен быть установлен глобально: ```npm install -g gulp-cli``` или ```yarn global add gulp-cli```;
* определитесь с рабочей папкой, где будете делать проект (она должна быть вне Dropbox);
* скачайте сборку как zip или: ```git clone SRC```;
* перейдите в скачанную папку со сборкой: ```cd PRJ_NAME/sources```;
* введите команду, которая скачает необходимые компоненты для корректной работы нашей сборки, указанные в файле ```package.json```: ```npm install``` или ```yarn```;

## Как работать?

Проект собирается в папку ```html``` рядом с ```sources```.
Запускать сборщик можно двумя способами:

### Запуск

У нас открыт терминал, рабочая директория — ```sources```
Запускаем: ```gulp```

![](https://myscreenshot.ru/rv6wj.png)

Если вы всё сделали правильно, у вас должен открыться браузер с локальным сервером и работающим browser-sync. Мониторинг настроен на:
* ```sources/src/pug/**/*.pug```
* ```sources/src/sass/**/*.{scss,sass}```
* ```sources/src/fonts/**/*```
* ```sources/src/images/**/*``` — все картинки проходят автоматическое сжатие
* ```sources/src/images/favicons/*``` — из одной картинки генерируется необходимый набор фавиконок
* ```sources/src/images/skip-optimization/**/*``` — здесь картинки минуют оптимизацию
* ```sources/src/images/sprite-svg/*.svg``` — здесь svg собираются в один спрайт
* ```sources/src/js/**/*.js``` — из js файлов собирается один main.min.js

Соответственно всю работу ведём внутри ```sources/src/```.
Содержимое ```html``` полностью собирается автоматически, при запуске очищается, так что ничего туда вручную не сохраняйте.

Проверили, всё собралось, всё ок? Останавливаем watcher комбинацией ```Ctrl + C``` в терминале.

## Sass vs SCSS

Пишите как вам нравится! Сборщик поддерживает оба формата. Единственное условие — один .sass или .scss файл должен быть написан либо на чистом sass синтаксисе, либо scss. При этом разные файлы, которые вы имортируете, могут быть по разному и написаны. Для примера см. текущую структуру.

## Оптимизация изображений

**JPG**: оптимизация настроена и отлично работает, ничего мудрить не надо, главное — сохранять JPG с качеством 100% (без какого-либо сжатия).

**PNG**: оптимизация настроена и работает хорошо. В некоторых случаях TinyPNG будет лучше (по качеству и/или степени сжатия), но в целом результат близкий. PNG также сохранять оригинальный (PNG24), без сжатия и/или каких-либо оптимизаций.

**SVG**: оптимизация настроена и работает отлично. Однако сам по себе формат svg очень сложный, он может включать внутри в том числе и растровую графику(!), анимации, поэтому не исключена потеря/искажение svg на выходе (в таком случае воспользуйтесь советом ниже). Тем не менее, при тестировании, каких-либо проблем с данным оптимизатором не выявлено.

На особый случай присутствует папка ```sources/src/images/skip-optimization/``` — все файлы из неё копируются без какого-либо вмешательства сразу в ```html/images/```.
Сделано на случай, если оптимизатор сработал плохо для того или иного изображения (оптимизируем вручную в таком случае).
**Внимание:** сохраняя файл в ```sources/src/images/skip-optimization/``` убедитесь, что нет файла с таким же именем в основной папке ```sources/src/images/```!

В этом таске также есть нюанс: оптимизируются только те изображения, которых ещё нет в ```html/images/```.
В случае запуска полной сборки, ```html``` очищается и всё ок, все изображения снова оптимизируются.
В случае отдельного запуска ```gulp images``` или работает watcher и вы снова сохраняете изображение под тем же именем — оно сразу не пройдет оптимизацию. Нужно предварительно удалить такой же файл с ```html/images/```.

## Иконочный шрифт? Больше не используем!

Вместо него — svg спрайты. Шрифт использовали ранее для максимальной кроссбраузерности, сейчас это не актуально. Подробное сравнение [здесь](https://css-tricks.com/icon-fonts-vs-svg/).

По спрайтам смотрите описание и примеры в рабочем шаблоне.


## Bower или подключение либ (в том числе таких как jQuery, slick и др.)

Раньше для автоматического скачивания либ, плагинов был популярен Bower, сейчас практически все поддерживают добавление через NPM или Yarn.

Например, вам нужен [jQuery](https://jquery.com/) (уже используется в сборке в качестве примера), вводим команду: ```npm install jquery``` или ```yarn add jquery```.

Либа скачается в ```souces/node_modules```, а также будет прописана зависимость в ```sources/package.json```, секция ```dependencies```.
Когда зависимость уже прописана — данные команды не нужны, все автоматически скачается при развертывании проекта (```npm install``` или ```yarn```).
Для удаления: ```npm uninstall jquery``` или ```yarn remove jquery```. Также можно вручную почистить ```sources/package.json``` и запустить ```npm install``` или ```yarn```.
Примечание: удаленные таким образом либы автоматически **не удаляются** из ```sources/src/libs```. Всё лишнее чистим там вручную.

Далее запускаем: ```gulp``` или сразу ```gulp --gulpfile livehtml.js lh``` — либы целиком скопируются в ```sources/src/libs```. Там будут в том числе исходные файлы, документация. Вас интересуют только собранные минифицированные дистрибутивы, чаще всего они в папке ```dist```.

Остаётся только прописать путь к данной библиотеке в ```sources/src/js/_libs_concat.js```.
Вуаля — весь наш JS собирается в один файл ```html/js/main.min.js``` он и подключен в pug ```sources/src/pug/base/_layout.pug```.

Для примера в данной сборке подключен jQuery версии 3.3.1 и slick 1.8.1 (см. ```package.json``` секция ```dependencies```).
Для слика ещё прописывается импорт стилей, см. ```sources/src/sass/base/_layout.scss```.

Команды и точное название плагинов всегда указываются на сайтах данных плагинов.
