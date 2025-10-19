# 🚀 Воппер  

Команда **Воппер** участвует в хакатоне *«Лидеры цифровой трансформации»*, задача №8.  

Наш проект — это сервис с **backend driven** подходом к построению пользовательских интерфейсов.  

---

## 📑 Презентация  
Презентацию можно найти прямо в репозитории:  
`Команда Воппер хакатон.pptx`  
или [по ссылке](https://disk.yandex.ru/i/JTq4-uqKK9Ycng)

---

## 🛠 Технологический стек  

**Backend:**  
- Go  
- MongoDB  

**Frontend:**  
- React (админ-панель для редактирования интерфейсов)  

**Mobile:**  
- Android (Kotlin, Jetpack Compose, Coil, Ktor, kotlinx.serialization)

---

## ▶️ Как запустить  

### Клиентское приложение  
1. Установить apk-файл.  
2. Запустить приложение на Android.  

### Админ-панель  
1. Клонировать репозиторий.
2. Открыть терминал
3. Зайти в папку avito_bd_admin
4. Ввести `npm install`
5. Ввести `npm run dev`  
6. Использовать админку для редактирования интерфейсов.  

### База данных и бэкенд  
- БД находится на сервере, запускать её локально не нужно.  
- Документация по API доступна в Swagger:  
  `backend/cmd/docs/swagger.yaml`  

---

## 📂 Структура репозитория  

- `backend/` — серверная часть на Go  
- `avito_bd_admin/` — админ-панель на React  
- `android/` — клиентское приложение  
- `Команда Воппер хакатон.pptx` — презентация
- `client.apk` - апк файл

---


## 📌 Итог  

Наш сервис — это удобный инструмент для построения UI с управлением через сервер. Админка позволяет редактировать интерфейсы, а клиентское приложение сразу отображает изменения.  


### Документация к android части


[![Typing SVG](https://readme-typing-svg.herokuapp.com?color=%2336BCF7&lines=🧩UIKit+-+JSON-Driven+UI+для+Android+Jetpack+Compose)](https://git.io/typing-svg)

**UIKit** — это движок для построения экранов Android на основе JSON-описаний.
Репозиторий содержит два модуля:

* uikit — Android Library с парсером JSON, системой действий (ActionDispatcher), состоянием (ScreenState/DataState) и рендерерами компонентов на Compose.

* composeTutorial — демо-клиент, показывающий, как интегрировать библиотеку и рендерить экраны из JSON.

-----

## ⚙️ Ключевая идея

Приложение целиком зависит от админки (веб-сайта), где продукт-менеджер/контент-редактор собирает интерфейс из компонентов.
Клиентское приложение получает JSON-описание экрана с этого сайта (через API), парсит его и отрисовывает в рантайме. Без публикации новой версии в сторах можно:

* добавлять/изменять компоненты;

* добавлять действия к компоненту;

* перестраивать экраны;

* запускать A/B-тесты

-----

## 🧱 Минимальный JSON экрана
```json
{
  "_id": "03213239-75dc-4393-8c88-c95d4c00cd5a",
  "title": "тест",
  "type": "screen",
  "topBar": [],
  "content": [],
  "bottomBar": [],
  "snackbars": [],
  "bottomSheets": []
}
```

## 🔍 Обзор архитектуры
```
uikit/
 ├─ build.gradle(.kts)          
 └─ src/main/java/github/detrig/uikit/
    ├─ core/                    # ядро движка
    │   ├─ Action.kt            # модель всех Action + ActionEvent
    │   ├─ ActionDispatcher.kt  # шина действий (регистрация/вызов хэндлеров)
    │   ├─ ActionHandler.kt     # интерфейс хэндлеров действий
    │   └─ DataBinder.kt        # подстановка данных (binding) в шаблоны списков
    │
    ├─ states/                  # состояние движка
    │   ├─ ScreenState.kt       # видимость/значения компонентов, snackbar/sheet и т.п.
    │   └─ DataState.kt         # данные списков (List/LazyColumn) по ключам
    │
    └─ components/              # декларативные компоненты и их рендереры
        ├─ screen/
        │   ├─ ScreenComponent.kt
        │   ├─ ScreenParser.kt  # JSON → дерево компонентов (kotlinx.serialization)
        │   └─ ScreenRenderer.kt# Scaffold/topBar/content/bottomBar/snackbars/sheets
        │
        ├─ utils/
        │   ├─ Component.kt     # базовый полиморфный компонент
        │   ├─ ComponentRenderer.kt
        │   └─ ModifierModel.kt 
        │
        ├─ box/                 # BoxComponent + BoxRenderer
        ├─ ...
```
----
## 🧩 Компоненты (общее)

Компоненты определяются полем type (например: text, button, row, column, image, checkbox, card, spacer, icon, list, lazy_column, snackbar, bottomsheet, screen).
Каждый компонент поддерживает:

* _id — идентификатор;

* modifier — декларативные свойства layout/стиля (fillMaxWidth/Height, padding, size, background, shape и т.п.);

* actions — список действий, привязанных к событиям (см. далее).

---
## 🧠 Actions & Events

**События (ActionEvent)**

* onClick — клик по компоненту (кнопка, карточка и т.п.).

* onLongClick — длительное нажатие (если применимо).

* onValueChange — изменение значения (поле ввода, чекбокс и т.п.).

* onScreenInitialized — экран смонтирован / готов (запускается один раз для компонента/экрана).


**Действия (Action)**

**1. _navigate_**

**2. _showSnackbar_**
  

**3. _showBottomSheet_**
  

**4. _fetch_data_**


**5. _set_value_**
  
---
## 🔗 Подстановка данных (binding) в списках

* Источник данных приходит из админки отдельным JSON (или как результат fetch_data).

* В шаблоне элемента списка используйте плейсхолдеры "$fieldName" — движок подставит значения из текущего элемента.

* Подстановка работает в контексте списков (list/lazy_column) и применяется ко всем строковым/булевым/числовым полям компонента, где это уместно.

* Поток: fetch_data → DataState.setList(key, items) → ListRenderer берёт template[0] → клонирует на каждый items[i] → рендерит.


----

## 🛠 Интеграция в приложение

**1. Зависимости**

* Kotlin, Jetpack Compose 

* kotlinx.serialization 

* Coil 

* Coroutines 

* (Опционально) Navigation Compose

**2. Инициализация UI-состояния**

* Создайте ScreenState, DataState, ActionDispatcher.

* В LaunchedEffect зарегистрируйте ActionHandler’ы (navigate, fetch_data, при необходимости — кастомные).

**3. Парсинг и рендер**

* Получите JSON экрана (из сети/кэша/файла).

* Вызовите ScreenParser.parse(json).

* Отобразите ScreenRenderer.Render(component, screenState, dataState, dispatcher).

**4. Сеть и кэш**

* В реальном приложении fetch_data направляйте на ваш API.

* Добавьте кэширование экранов и данных (Room/Preferences/файлы) для оффлайна.

* Версионируйте схему и экраны (например, minVersion в JSON) — приложение может показать заглушку, если схема не поддерживается.

**5. UI-состояния клиента**

* Пример темы — в демо-клиенте (composeTutorial/ui/theme).

* Общий обработчик состояний (loading/error/empty) — на стороне клиента (пример в демо).
