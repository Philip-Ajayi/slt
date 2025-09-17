import RegistrationForm from "@/components/register/RegistrationForm";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-purple-800 mb-6">
          Salt and Light 2025 Registration
        </h1>
        <p className="text-center text-lg text-gray-700 mb-12">
          Fill in your details below to secure your spot at{" "}
          <span className="font-semibold text-purple-700">
            Salt and Light 2025
          </span>. We can’t wait to see you!
        </p>
        <RegistrationForm />
      </div>
    </div>
  );
}
