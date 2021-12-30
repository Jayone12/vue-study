// import
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// export
module.exports = {
 resolve: {
  extensions: ['.js', '.vue'],
  // 경로 별칭
  alias: {
   '~': path.resolve(__dirname, 'src'),
   'assets': path.resolve(__dirname, 'src/assets')
  }
 },

 entry: './src/main.js', // 파일을 읽어들이기 시작하는 진입점 설정

 output: { // 결과물(번들)을 반환하는 설정
  // path: path.resolve(__dirname, 'public'), // node에서 필요로하는 절대경로를 적어야한다.
  // filename: 'main.js',
  clean: true // 새로 빌드 명령 하였을 때 기존 데이터를 삭제 후 다시 저장
 },

 module: {
  rules: [
   {
    test: /\.vue$/,
    use: 'vue-loader'
   },
   {
    test: /\.s?css$/,
    use: [
     // 'vue-style-loader',
     'style-loader', // html style 태그에 아래 내용 삽입
     'css-loader', //js에서 css를 해석하는 패키지
     'postcss-loader',
     'sass-loader'
    ]
   },
   {
    test: /\.js$/,
    use: [
     'babel-loader'
    ]
   },
   {
    test: /\.(png|jpe?g|gif|webp)$/,
    use: 'file-loader'
   }
  ]
 },

 plugins: [ // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  new HtmlPlugin({
   template: './index.html' // 템플릿으로 index.html을 사용하겠다고 설정
  }),
  new CopyPlugin({
   patterns: [
    {from: 'static'}
   ]
  }),
  new VueLoaderPlugin()
 ],
 devServer: {
  host: 'localhost'
 }
}