FlashDB
=======

## What's the flashDB
A database system for providing a local, fast, convenient accessor, which can query, extend and remove.  
And it's support Multi-keys.

## Background
As you know, you could use `memcached` for replacing `flashDB`.   
That's all right, It's powerful, sophisticated develop tool, but if you use flashDB, it's more light, more fast and more close to you.  
Here is a case, you need build an authenticate system, programmers should move the table `auth` or related stuff to the CPU/RAM of servers at the startup stage, so it's long for a local/fast database system especially a more complexed authenticate needed process.

## API, It's very KISS

### .create(name, keys)
```javascript
var flashDB = require('./flashDB')
var Persons = flashDB.create('Persons', ['firstName', 'lastName'])
```

### .add(value)
Only one param as you see, the reason is your key/keys is created after `.create()`, such that while you want to add a document/value, it can valid and recognize a certain number of keys and extracted them. To our surprise, `FlashDB` did as a different library that support multi-keys maps.
```javascript
Person.add({
  firstName: 'Yorkie',
  lastName:  'Nell',
  Age:       23
})
```

### .get(key, by)
```javascript
// namely getByDefaultKey()
var Yorkie = Person.get('Yorkie')
// namely getByFirstName()
var Delo   = Person.get('Yorkie', 'firstName')
// namely getByLastName()
var Nell   = Person.get('Nell', 'lastName')

// test
console.log( Yorkie === Nelo )  // true
console.log( Yorkie === Nell )  // true
console.log( Nelo   === Nell )  // true
```

## How to ensure that a set had existed in a map?
Answer is:
```javascript
// you can create a map like this:
var users = flashDB.create('Users', ['name', 'email'])
// push all user on startup
db.users.forEach(function(user) {
  users.add(user)
})
```
Next, you need code the answer in your register handler:
```javascript
function isExisted(user) {
  var users = flashDB.users
  return users.get(user.name, 'name') || users.get(user.email, 'email')
}

//you can call it:
var user = {
  name: 'yorkie',
  email: 'l900422@vip.qq.com'
}
if (isExisted(user)) {
  // error handler
}
// your turn
```

## License

```
(The MIT License)

Copyright (c) 2009-2011 YorkieNell <l900422@vip.qq.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
