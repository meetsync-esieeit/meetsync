
import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-white p-8 rounded-2xl shadow-lg w-96">
                <h1 className="text-center text-xl font-bold mb-12">MEETSYNC</h1>


                <input
                    type="email"
                    placeholder="Email"
                    className="text-center w-full p-3 mb-4 bg-[#343b4a] rounded-md focus:outline-none text-white placeholder-gray-400"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="text-center w-full p-3 mb-4 bg-[#343b4a] rounded-md focus:outline-none text-white placeholder-gray-400"
                />

                <button className="w-full py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition">
                    Créer le compte
                </button>

                <div className="my-4 border-t border-gray-600"></div>

                <button className="w-full py-3 bg-white text-black font-semibold rounded-md border border-red-500 hover:bg-gray-100 transition">
                    Se connecter avec Google
                </button>

                <p className="text-center mt-4 text-sm">
                    Pas encore de compte ?{" "}
                    <Link href="/auth/signup" className="text-blue-400 hover:underline">
                        Inscrivez-vous
                    </Link>
                </p>
            </div>
        </div>
    );
}
