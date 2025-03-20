import Image from "next/image";

export default function DanceSchedule() {
  return (
    <div className="min-h-screen bg-gray-700 text-white p-6 md:p-10">
      {/* Introduction Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">簡介</h1>
        <p className="text-lg leading-relaxed">
          Lok is a graduate of The Chinese University of Hong Kong and a Hip Hop
          enthusiast. He has been trained by various well-respected Hip Hop
          masters in New York including Brian 'Footwork' Green, Jazzy J a.k.a.
          Soulfire, Spex, Stretch and Mr. Wiggles. At just age 25, Lok is an
          experienced instructor at several secondary schools and universities
          in Hong Kong and is the choreographer of numerous shows and
          performances for their respective dance societies.
        </p>
      </section>

      {/* Schedule Section */}
      <section>
        <h1 className="text-4xl font-bold mb-6">時間表</h1>
        <h2 className="text-3xl font-bold mb-8">LOK CLASSES SCHEDULE</h2>

        <div className="space-y-4">
          {/* Class 1 */}
          <div className="flex flex-col sm:flex-row bg-gray-800 rounded-sm overflow-hidden">
            <div className="w-full sm:w-32 md:w-40">
              <img
                src="https://cdn.midjourney.com/4330b563-6a27-4da4-bd1f-c8d84ce90570/0_2.png"
                alt="Lok"
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold">13</span>
                  <div>
                    <h3 className="text-xl font-bold">OPEN STYLE - LOK</h3>
                    <p className="text-gray-400">3月</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span>7:00pm - 8:30pm</span>
                  <span className="text-gray-400">•</span>
                  <span>Studio S</span>
                </div>
              </div>
              <button className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                Book This Class
              </button>
            </div>
          </div>

          {/* Class 2 (Unavailable) */}
          <div className="flex flex-col sm:flex-row bg-gray-800 rounded-sm overflow-hidden opacity-50">
            <div className="w-full sm:w-32 md:w-40">
              <img
                src="https://cdn.midjourney.com/4330b563-6a27-4da4-bd1f-c8d84ce90570/0_2.png"
                alt="Lok"
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold">16</span>
                  <div>
                    <h3 className="text-xl font-bold">OPEN STYLE - LOK</h3>
                    <p className="text-gray-400">3月</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span>5:30pm - 7:00pm</span>
                  <span className="text-gray-400">•</span>
                  <span>Studio S</span>
                </div>
              </div>
              <button
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                disabled
              >
                Book This Class
              </button>
            </div>
          </div>

          {/* Class 3 */}
          <div className="flex flex-col sm:flex-row bg-gray-800 rounded-sm overflow-hidden">
            <div className="w-full sm:w-32 md:w-40">
              <img
                src="https://cdn.midjourney.com/4330b563-6a27-4da4-bd1f-c8d84ce90570/0_2.png"
                alt="Lok"
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold">17</span>
                  <div>
                    <h3 className="text-xl font-bold">OPEN STYLE - LOK</h3>
                    <p className="text-gray-400">3月</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span>7:00pm - 8:30pm</span>
                  <span className="text-gray-400">•</span>
                  <span>Studio S</span>
                </div>
              </div>
              <button className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                Book This Class
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
