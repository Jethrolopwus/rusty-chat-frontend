import React from "react";
import {
  MessageCircle,
  Users,
  Shield,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section
        id="home"
        className="py-20 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect & Chat
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                {" "}
                Seamlessly
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the future of communication with our modern chat
              application. Connect with friends, family, and colleagues in
              real-time with advanced features and beautiful design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={"/register"}>
                <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </Link>
              <Link href={"/register"}>
                <button className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-4 px-8 rounded-xl border-2 border-blue-300 transition-all duration-200">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Rusty Chat?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the features that make our chat application the perfect
              choice for your communication needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Experience real-time messaging with instant delivery and
                seamless synchronization across all your devices.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your conversations are protected with end-to-end encryption and
                advanced security protocols.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Group Chats
              </h3>
              <p className="text-gray-600">
                Create unlimited group chats with advanced management tools and
                customizable settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users who love our chat application.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "This chat app has completely transformed how our team
                communicates. The interface is intuitive and the features are
                exactly what we needed."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold">JS</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">John Smith</p>
                  <p className="text-sm text-gray-600">Team Lead</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "I love the clean design and smooth performance. It's become my
                go-to communication tool for both work and personal use."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold">MJ</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Maria Johnson</p>
                  <p className="text-sm text-gray-600">Designer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "The security features give me peace of mind, and the group chat
                functionality is perfect for managing our project teams."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold">RW</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Robert Wilson</p>
                  <p className="text-sm text-gray-600">Project Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Chatting?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join our community today and experience the future of communication.
            It's free to get started!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/register"}>
              <button className="bg-white hover:bg-gray-100 text-purple-600 font-semibold py-4 px-8 rounded-xl transition-all duration-200">
                Sign Up Now
              </button>
            </Link>
            <button className="bg-transparent hover:bg-white hover:bg-opacity-20 text-white font-semibold py-4 px-8 rounded-xl border-2 border-white transition-all duration-200">
              Download App
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
