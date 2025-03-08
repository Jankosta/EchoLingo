# 📂 EchoLingo Database Schema

## **1. `users` Collection**
Stores students and instructors using EchoLingo.

### Fields:
- **`name`** (string) – Full name of the user.
- **`email`** (string) – Unique email of the user.
- **`password`** (string) – Encrypted password for authentication.
- **`role`** (string) – `"student"` or `"instructor"`.
- **`preferred_language`** (string) – The primary language the user is learning.
- **`profile_pic`** (string) – URL to the user's profile picture.
- **`created_at`** (timestamp) – When the user registered.

---

## **2. `categories` Collection**
Stores language-learning topics (e.g., Grammar, Pronunciation, Vocabulary).

### Fields:
- **`name`** (string) – Name of the category.
- **`description`** (string) – Short description of the category.
- **`language`** (string) – The language this category applies to.

#### **Example Document in `categories`:**
```json
{
  "name": "Grammar",
  "description": "Rules and structures of a language",
  "language": "English"
}
```

---

## **3. `materials` Collection**
Stores uploaded learning resources.

### Fields:
- **`title`** (string) – Title of the learning material.
- **`type`** (string) – `"text"`, `"audio"`, `"video"`, `"pdf"`.
- **`content`** (string, URL) – Learning content or file URL.
- **`category_id`** (reference) – Links to `categories` collection.
- **`language`** (string) – The language this material is for.
- **`user_id`** (reference) – User who uploaded the material.
- **`created_at`** (timestamp) – When it was uploaded.
- **`updated_at`** (timestamp) – Last update timestamp.

#### **Example Document in `materials`:**
```json
{
  "title": "Basic French Greetings",
  "type": "video",
  "content": "https://storage.googleapis.com/echolingo/french_greetings.mp4",
  "category_id": "/categories/conversation",
  "language": "French",
  "user_id": "user_1234",
  "created_at": "<timestamp>",
  "updated_at": "<timestamp>"
}
```

---

## 🔗 Relationships

- **Material and Category**:  
  The `category_id` field in the `materials` collection is a **reference** to a document in the `categories` collection. This establishes a one-to-many relationship between categories and materials.

- **User and Material**:  
  The `user_id` field in the `materials` collection associates each material with the user who uploaded it, providing user traceability.

---

## ⚙️ Querying Data

### Fetching Materials by Category

You can fetch materials belonging to a specific category (e.g., "Science") by querying the `materials` collection, using the reference in the `category_id` field:

#### **Example Query in JavaScript (using Firestore SDK):**
```js
// Fetching Learning Materials by Category
async function fetchMaterialsByCategory(categoryId) {
  const snapshot = await db.collection("materials")
    .where("category_id", "==", db.doc(`categories/${categoryId}`))
    .get();

  snapshot.forEach(doc => console.log(doc.id, doc.data()));
}

fetchMaterialsByCategory("grammar");

//Fetching Learning Materials by Language
const db = firebase.firestore();

async function fetchMaterialsByLanguage(language) {
  const snapshot = await db.collection("materials")
    .where("language", "==", language)
    .get();

  snapshot.forEach(doc => console.log(doc.id, doc.data()));
}

fetchMaterialsByLanguage("French");

// Fetching User’s Practice History
async function fetchUserPractice(userId) {
  const snapshot = await db.collection("practice_sessions")
    .where("user_id", "==", userId)
    .get();

  snapshot.forEach(doc => console.log(doc.id, doc.data()));
}

fetchUserPractice("user_abc123");
```

---