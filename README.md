# She Can Foundation - MERN Internship Task

A full-stack MERN web application created as an internship task for She Can Foundation. It includes a responsive women-empowerment themed landing page, contact/support form, MongoDB storage, admin authentication, protected admin dashboard, message status management, filters, search, Brevo email notifications, and Razorpay Test Mode demo donation.

## Features

- Responsive landing page
- Women empowerment themed UI
- Animated hero section
- Auto-changing image carousel
- Contact/support form
- Interest type selection
- Form validation
- MongoDB database integration
- REST APIs
- Admin signup/login
- JWT authentication
- Protected admin dashboard
- View, filter, search messages
- Mark reviewed/important
- Delete messages
- Brevo email notifications
- Razorpay Test Mode demo donation
- Donation records in admin panel
- Fully responsive design

## Important Notes

- Razorpay is implemented in Test Mode only.
- No real donation is collected.
- For real NGO donations, official Razorpay live credentials and legal permission from the organization are required.
- Brevo sender email must be verified in Brevo.
- This project is created as an internship/demo task.

## Tech Stack

Frontend:
- React with Vite
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion
- Lucide React
- React Hot Toast

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt.js
- CORS
- Dotenv
- Razorpay
- Crypto
- Axios for Brevo API
- Nodemon

## Project Structure

```text
she-can-foundation-mern/
  frontend/
  backend/
  README.md
```

## Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env` using `backend/.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_NAME=She Can Foundation Demo
BREVO_SENDER_EMAIL=your_verified_sender_email
ADMIN_NOTIFY_EMAIL=your_admin_email

RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

Run backend:

```bash
npm run dev
```

Backend health check:

```text
http://localhost:5000/api/health
```

## Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env` using `frontend/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key_id
```

Run frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Admin Setup

1. Start backend.
2. Start frontend.
3. Go to `/admin/signup`.
4. Create an admin account.
5. Login from `/admin/login`.
6. Open `/admin/dashboard`.

Public users do not need signup or login. Only admins use signup/login.

## API Summary

Auth:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Messages:
- `POST /api/messages`
- `GET /api/messages?status=new&interestType=Volunteer&search=rhythm`
- `GET /api/messages/stats`
- `PATCH /api/messages/:id/status`
- `DELETE /api/messages/:id`

Donations:
- `POST /api/donations/create-order`
- `POST /api/donations/verify-payment`
- `GET /api/donations?search=payment_id`
- `GET /api/donations/stats`

## Brevo Email

Brevo email notifications are optional. If `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, or recipient email is missing, the app logs a skip message and continues working.

## Razorpay Test Mode

Use Razorpay Test Mode keys only:
- Backend: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- Frontend: `VITE_RAZORPAY_KEY_ID`

The donation flow creates a test order, opens Razorpay Checkout, verifies the signature, saves the donation record, and sends optional Brevo emails.

## Production Build

Frontend:

```bash
cd frontend
npm run build
```

Backend:

```bash
cd backend
npm start
```
