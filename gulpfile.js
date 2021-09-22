const { src, dest, series, watch, task, parallel } = require('gulp'),
  fs = require('fs'),
  pkg = JSON.parse(fs.readFileSync('./package.json')),
  browserSync = require('browser-sync'),
  sass = require('gulp-sass')(require('sass'));
  // sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  cp = require('child_process'),
  sourcemaps = require('gulp-sourcemaps'),
  plumber = require('gulp-plumber'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  groupCssMediaQueries = require('gulp-group-css-media-queries'),
  jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll',
  zip = require('gulp-zip'),
  ymlRead = require('read-yaml'),
  ymlData = ymlRead.sync('_config.yml'),
  imagemin = require('gulp-imagemin');


function build() {
  return cp.spawn(
    jekyll, ['build', 'exec'], { stdio: 'inherit' }
  );
};

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

function compress() {
  return src('_lp/*')
    .pipe(zip(pkg.name + '.zip'))
    .pipe(dest('./'))
}

function js() {

  jsPaths = ymlData.libs.js
  
  // [
  //   './node_modules/jquery/dist/jquery.min.js',
  //   './node_modules/bootstrap/dist/js/bootstrap.min.js',
  //   './node_modules/wowjs/dist/wow.min.js',
  //   './node_modules/jquery-modal/jquery.modal.min.js',
  //   './_js/*.js'
  // ]

  console.log(jsPaths)

  return src(jsPaths)
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(dest('js'))
    .pipe(dest(ymlData.destination + '/js'))
    .pipe(browserSync.reload({ stream: true }))
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); });
}

function scss() {
  return src('_scss/main.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['scss'],
      outputStyle: 'compressed',
      errLogToConsole: true
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))    
    .pipe(groupCssMediaQueries())
    .pipe(sourcemaps.write())
    .pipe(dest(ymlData.destination + '/css'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(dest('css'));
}

function min_css() {
  return src('css/main.css')
    .pipe(cleanCSS({ debug: true }, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(dest(ymlData.destination + '/css'));
}

function min_img() {
  return src('./images/**')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest(ymlData.destination + '/images'))
}

function browser_sync() {
  browserSync({
    server: {
      baseDir: ymlData.destination,
      tunnel: true,
    },
    open: "external"
  });
  watch('_scss/**/*.scss', scss);
  watch('_js/**/*.js', js);
  watch(['**/*.yml', '*.html', '_layouts/*.html', '_includes/**/*.html', 'mails/**/*.html', '_posts/*'], series(build, browserSyncReload));

}

task("browser_sync", browser_sync);

task("scss", scss);
task("js", js);

task("assets", series(scss, js));

task("img_min", min_img);
task("min_css", min_css);
task("min_assets", parallel(min_img, min_css));

task("build", series(task('assets'), build));
task("export", series(build, compress));

task("default", series(build, browser_sync));
