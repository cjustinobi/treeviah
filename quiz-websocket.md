# Quiz Websocket Events

This is categoried into server and clients events. When listening/subscribing to an event from the server we use `socket.on()` When emitting/publishing an event from the client we use `socket.emit()`

## Client Events

### `submitAnswer`

**Description:** Sent when a user submits an answer to a quiz question.

**Payload:**

- `questionId` (number): The ID of the question being answered.
- `answer` (string): The user's answer to the question.

**Example**

```js
socket.emit('submitAnswer', { questionId, answer })
```

## Server Events

### `onboardingStarted`

**Description** Sent to signal users to join the quiz.

**Payload:**

- `quizCode` (string): The code that will be used to join the quiz.

**Example**

```js
socket.on('onboardingStarted', (data) => {
  console.log('onboarding ', data)
})
```

### `userJoined`

**Description** Shows who joined the game.

**Payload:**

- `quizId` (number): The quiz ID.
- `socketId` (string): Joined user socket ID.
- `username` (string): Joined user username.

**Example**

```js
socket.on('userJoined', (data) => {
  console.log('user joined ', data)
})
```

### `nextQuestion`

**Description** For displaying next question.

**Payload:**

- `question` (object): This contains the question details.

**Example**

```js
socket.on('nextQuestion', (data) => {
  console.log('next question ', data)
})
```

### `quizResult`

**Description** For displaying Quiz result.

**Payload:**

- `result` (array): This contains the first-three users that won the quiz.

**Example**

```js
socket.on('quizResult', (data) => {
  console.log('quiz result ', data)
})
```
