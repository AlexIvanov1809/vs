Review:

1. В readme описать шаги развертывания приложения
2. Писать осмысленные коммиты, которые описывают то, что делает коммиты. Комит должен отвечать на вопрос, "что делает этот коммит?", например, "добавляет фильтр". Коммиты типа "ref", "fix", "done", 'ref' - не несут никакой полезной нагрузки. Не в прошлом времени
3. Делать больше атомарных коммитов. Если в коммите встречается "и", то, скорее всего, его можно было бы разбить на несколько
4. Коммит с версией "v2.0" должен содержать только обновление версии, без изменений в файлах, то есть он как бы подытоживающий историю
5. Сейчас чаще используют одинарные кавычки, вместо двойных. Чтобы не делать этого вручную, настраивают линтер
6. Добавь в проект eslint, prettier, чтобы делать меньше работы руками. Они помогут исправить форматирование, какие-то мелкие ошибки подсветят
7. Использовать async/await вместо then
8. если не используется тайпскрпт, то нужно использовать prop-types, чтобы хоть как-то задокументировать компоненты
9. Пустота выражается через null/undefined, а не через пустую строку. Пустой массив - это [], а не \["", "", ""]
10. Название функции должно быть глаголом и отражать то, что она делает. Параметры функции должно легко угадываться и иметь логичные имена. data, item. info - плохие названия переменных, потому что асболютно непонятно, что в них хранится
11. Пропсы, принимающие колбэки префиксуются "on" - onLogin, onSubmit и т.д., а функции обработчики, которые туда передаются префиксуются "handle" - handleLogin, handleSubmit и т. д.
12. Данные, возвращаемые сервером, очень редко будут соответствовать фронт энду, поэтому нужен адаптер\преобразователь между тем, как данные получены и положены в хранилище. Например вот тут:
```javascript
  httpService
    .fetchOneProduct(id)
    .then((data) => {
      // здесь ты данные кладешь в хранилище в том виде, как они пришли с сервера, создавая сильную связность с бэкэндом
      // стоит бэкэндк переименовать какое-то поле и это способствует обильному рефакторингу. Плюс с помощью адаптера 
      // можно преобразовать snake_case от бэкэнда в camelCase
      products.setProducts(data)
      
      // лучше сделать так:
      products.setProducts({
        id: data.id,
        name: data.name,
        shortName: data.short_name,
        // и т.д.
      })
      
      // таким образом бэкэнд не приникает во фронтовый код
    })
```
13. Нужно поработать над обработкой ошибок. Завести ErrorBoundary для ошибок в компонентах
14. Добавить файл .env.example, в котором будут примеры переменных окружения, которые нужны для запуска приложения
