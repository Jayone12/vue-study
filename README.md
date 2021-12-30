# vue.js 시작하기

## vue.js 란?

Vue(/vjuː/ 로 발음, view 와 발음이 같습니다.)는 사용자 인터페이스를 만들기 위한 프로그레시브 프레임워크 입니다. 다른 단일형 프레임워크와 달리 Vue는 점진적으로 채택할 수 있도록 설계하였습니다. 핵심 라이브러리는 뷰 레이어만 초점을 맞추어 다른 라이브러리나 기존 프로젝트와의 통합이 매우 쉽습니다. 그리고 Vue는 현대적 도구 및 지원 라이브러리 (opens new window)와 함께 사용한다면 정교한 단일 페이지 응용프로그램을 완벽하게 지원할 수 있습니다. - vue.js 홈페이지

## vue.js CDN 불러오기

해당 내용은 vue3 버전으로 진행되었습니다.

```html
<script src="https://unpkg.com/vue@next"></script>
```

## 선언적 렌더링 (Declarative Rendering)

Vue.js의 핵심에는 간단한 템플릿 구문을 사용하여 DOM에서 데이터를 선언적으로 렌더링 할 수있는 시스템이 있습니다.

```HTML
<div id="app">
  <h1>{{ message }}</h1>
 </div>
```

```javascript
const app = {
  data() {
    return {
      message: "hello World!",
    };
  },
};
Vue.createApp(app).mount("#app");
```

## 사용자 입력 핸들링

사용자가 앱과 상호 작용할 수 있게 하기 위해 `v-on`또는 `@click` 로 vue 인스턴스에서 메소드를 호출하는 이벤트 리스너를 추가 할 수 있다.

```HTML
<div id="app">
  <h1 v-on:click="addWord">{{ message }}</h1>
 </div>
```

```javascript
const app = {
  data() {
    return {
      message: "hello World!",
    };
  },
  methods: {
    addWord() {
      this.message += "!";
    },
  },
};
Vue.createApp(app).mount("#app");
```

## 조건문과 반복문

### 조건문

`v-if`를 사용하여 엘리멘트 표시에 대한 조건문을 작성할 수 있다.

```HTML
<div id="app">
  <h1 v-on:click="addWord">{{ message }}</h1>
  <p  v-if="message.length > 20">stop it!</p>
 </div>
```

`<p>`는 message의 글자수가 20 글자 넘을 경우 나타난다.

### 반복문

`v-for`를 사용하여 배열에서 데이터를 가져와 목록에 표시하는데 사용 할 수 있다.

```HTML
<div id="app">
  <h1 v-on:click="addWord">{{ message }}</h1>
  <p  v-if="message.length > 20">stop it!</p>
  <ul>
   <li v-for="toDo in toDos">{{ toDo }}</li>
  </ul>
 </div>
```

`li` 태그에 `toDos` 배열 갯수 만큼 반복하고 해당 하는 배열의 값들을 `toDo` 라는 변수에 할당하여 사용한다.

```javascript
const app = {
  data() {
    return {
      message: "hello World!",
      toDos: ["꾸준히 공부해야지", "어렵다", "차근차근"],
    };
  },
  methods: {
    addWord() {
      this.message += "!";
    },
  },
};
Vue.createApp(app).mount("#app");
```

## 컴포넌트 생성하여 조립하기

컴포넌트 시스템은 작고 독립적이며 재활용할 수 있다.
Vue에서 컴포넌트는 미리 정의된 옵션을 가진 Vue 인스턴스이다.

```javascript
const app = {
  data() {
    return {
      message: "hello World!",
      toDos: ["꾸준히 공부해야지", "어렵다", "차근차근"],
      count: 0,
    };
  },
  methods: {
    addWord() {
      this.message += "!";
    },
  },
};

Vue.createApp(app) // Vue 어플리케이션을 생성한다. (상수 app을 기준으로)
  .component("conponent-content", {
    // component함수를 사용하여 사용할 이름을 작성 후 temlplate을 작성한다.
    template: `
      <div>
        <h2>이 곳은 component로 불러온 곳입니다.</h2>
        <ul>
          <li>내용 1</li>
          <li>내용 2</li>
          <li>내용 3</li>
          <li>내용 4</li>
        </ul>
      </div>
    `,
  })
  .mount("#app"); // html에서 사용한 엘레먼트의 ID를 적어서 연결한다.
```

```HTML
 <div id="app">
  <h1 v-on:click="addWord">{{ message }}</h1>
  <p  v-if="message.length > 20">stop it!</p>
  <ul>
   <li v-for="toDo in toDos">{{ toDo }}</li>
  </ul>
  <conponent-content></conponent-content>
 </div>
```

## root instance에서 데이터 가져오기

`v:bind`와 `props`를 사용하여 root instance의 데이터도 가져올 수 있다.

```javascript
// root Instance
const app = {
  data() {
    return {
      message: "hello World!",
      toDos: ["꾸준히 공부해야지", "어렵다", "차근차근"], //해당 데이터를 하위 컴포넌트에 전달
      count: 0,
    };
  },
  methods: {
    addWord() {
      this.message += "!";
    },
  },
};

Vue.createApp(app) // Vue 어플리케이션을 생성한다. (상수 app을 기준으로)
  .component("conponent-content", {
    // component함수를 사용하여 사용할 이름을 작성 후 temlplate을 작성한다.
    template: `
      <div>
        <h2>이 곳은 component로 불러온 곳입니다.</h2>
        <ul>
          <li v-for="todo in todos" v:bind:key="todo"> {{ todo }}</li>
        </ul>
      </div>
    `,
    props: ["todos"], // props함수를 사용하여 html에서 정한 v-bind 변수명을 호출한다.
  })
  .mount("#app"); // html에서 사용한 엘레먼트의 ID를 적어서 연결한다.
```

```HTML
 <div id="app">
  <h1 v-on:click="addWord">{{ message }}</h1>
  <p  v-if="message.length > 20">stop it!</p>
  <ul>
   <li v-for="toDo in toDos">{{ toDo }}</li>
  </ul>
  <conponent-content v-bind:todos = "toDos"></conponent-content> <!-- v-bind:[변수명] = "가져올 데이터명"-->
 </div>
```
