import Link from "next/link";
import FeedBackForm from "../../components/FeedBackForm";

export const metadata = {
  title: "Give us Your Feedback | New Life Medical Centre",
  description: "Let us Know how you feel about our services.",
};

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link
            href="/"
            className="text-teal-600 hover:text-green-700 text-sm font-medium"
          >
            ← Back to home
          </Link>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Give us a Feed back
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Fill in your details in the form below.
          </p>
        </div>
        <FeedBackForm />
      </div>
    </div>
  );
}
