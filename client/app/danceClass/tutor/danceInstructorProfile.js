export default function DanceInstructorProfile({
  showcaseData,
  showTeacherClassData,
  oneTeacherdata,
}) {
  const renderContent = () => {
    if (showcaseData) {
      return (
        <div className=" flex">
          {" "}
          <div className="space-y-4 mr-10">
            {" "}
            <div className="relative">
              <img
                src={showcaseData.someOneTeacher.profilePic}
                alt={showcaseData.someOneTeacher.nickname}
                width={500}
                height={600}
                className="w-full max-w-md"
              />
              <div className="absolute bottom-0 left-0 p-4">
                <h2 className="text-xl uppercase tracking-wider font-light mb-1">
                  {showcaseData.someOneTeacher.role}
                </h2>
                <h1 className="text-5xl uppercase font-bold tracking-wide">
                  {showcaseData.someOneTeacher.nickname}
                  <br />
                </h1>
              </div>
            </div>
          </div>
          {/* Bio and Schedule Section */}
          <div className="space-y-8">
            {" "}
            {/* Reduced space-y value */}
            {/* Bio Section */}
            <section>
              <h2 className="text-3xl font-bold mb-4">Information</h2>{" "}
              {/* Reduced margin-bottom */}
              <p className="text-sm md:text-base leading-relaxed">
                {showcaseData.someOneTeacher.description}
              </p>
            </section>
            {/* Schedule Section */}
            <section>
              <h2 className="text-3xl font-bold mb-4">Schedule</h2>{" "}
              {/* Reduced margin-bottom */}
              <h3 className="text-2xl uppercase font-bold mb-4">
                {" "}
                {/* Reduced margin-bottom */}
                {showcaseData.someOneTeacher.nickname} CLASSES SCHEDULE
              </h3>
              <div className="space-y-4 h-90 overflow-y-scroll">{renderClassContect()}</div>
          
            </section>
          </div>
        </div>
      );
    }      else if (oneTeacherdata) {
      return (
        <div className="grid md:grid-cols-2 gap-4 items-start">
          {" "}
          <div className="space-y-4">
            {" "}
            <div className="relative">
              <img
                src={oneTeacherdata.oneTeacher.profilePic}
                alt={oneTeacherdata.oneTeacher.nickname}
                width={500}
                height={600}
                className="w-full max-w-md"
              />
              <div className="absolute bottom-0 left-0 p-4">
                <h2 className="text-xl uppercase tracking-wider font-light mb-1">
                  {oneTeacherdata.oneTeacher.role}
                </h2>
                <h1 className="text-5xl uppercase font-bold tracking-wide">
                  {oneTeacherdata.oneTeacher.nickname}
                  <br />
                </h1>
              </div>
            </div>
          </div>
          {/* Bio and Schedule Section */}
          <div className="space-y-8">
            {" "}
            {/* Reduced space-y value */}
            {/* Bio Section */}
            <section>
              <h2 className="text-3xl font-bold mb-4">Information</h2>{" "}
              {/* Reduced margin-bottom */}
              <p className="text-sm md:text-base leading-relaxed">
                {oneTeacherdata.oneTeacher.description}
              </p>
            </section>
            {/* Schedule Section */}
            <section>
              <h2 className="text-3xl font-bold mb-4">Schedule</h2>{" "}
              {/* Reduced margin-bottom */}
              <h3 className="text-2xl uppercase font-bold mb-4">
                {" "}
                {/* Reduced margin-bottom */}
                {oneTeacherdata.oneTeacher.nickname} CLASSES SCHEDULE
              </h3>
              <div className="space-y-4">
                <div className="flex items-center bg-zinc-800 rounded-sm overflow-hidden hover:opacity-50 transition-opacity duration-100">
                  <div className="w-24 h-24 shrink-0">
                    <img
                      alt="Guru"
                      width="100"
                      height="100"
                      className="w-full h-full object-cover"
                      src="https://cdn.midjourney.com/f7dbfdbd-a499-447c-8ec5-e8bec82a8654/0_0.png"
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-between p-4">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold">20</div>
                        <div className="text-sm">3月</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold">- Guru</div>
                        <div className="text-sm text-gray-300">
                          10:00 - 12:00 •
                        </div>
                      </div>
                    </div>
                    <button variant="outline" className="whitespace-nowrap">
                      Book This className
                    </button>
                  </div>
                </div>
                <div className="flex items-center bg-zinc-800 rounded-sm overflow-hidden hover:opacity-50 transition-opacity duration-100">
                  <div className="w-24 h-24 shrink-0">
                    <img
                      alt="Guru"
                      width="100"
                      height="100"
                      className="w-full h-full object-cover"
                      src="https://cdn.midjourney.com/f7dbfdbd-a499-447c-8ec5-e8bec82a8654/0_0.png"
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-between p-4">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold">22</div>
                        <div className="text-sm">3月</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold">Hip Hop - Guru</div>
                        <div className="text-sm text-gray-300">
                          14:00 - 16:00 • Room XL
                        </div>
                      </div>
                    </div>
                    <button variant="outline" className="whitespace-nowrap">
                      Book This className
                    </button>
                  </div>
                </div>
                <div className="flex items-center bg-zinc-800 rounded-sm overflow-hidden hover:opacity-50 transition-opacity duration-100">
                  <div className="w-24 h-24 shrink-0">
                    <img
                      alt="Guru"
                      width="100"
                      height="100"
                      className="w-full h-full object-cover"
                      src="https://cdn.midjourney.com/f7dbfdbd-a499-447c-8ec5-e8bec82a8654/0_0.png"
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-between p-4">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold">18</div>
                        <div className="text-sm">3月</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold">Waacking - Guru</div>
                        <div className="text-sm text-gray-300">
                          12:00 - 14:00 • Room L
                        </div>
                      </div>
                    </div>
                    <button variant="outline" className="whitespace-nowrap">
                      Book This className
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  variant="secondary"
                  className="bg-zinc-600 hover:bg-zinc-500"
                >
                  Previous
                </button>
                <button
                  variant="secondary"
                  className="bg-zinc-600 hover:bg-zinc-500"
                >
                  Next
                </button>
              </div>
            </section>
          </div>
        </div>
      );
     }
  };

  const renderClassContect = () => {
    // 現在要將抓回來的課程內容變成一個個表
    if (showTeacherClassData) {
      return showTeacherClassData.tutorClass.map((element) => {
        const date = new Date(element.date); // 將日期字串轉換為 Date 物件
        const month = date.getMonth() + 1; // getMonth() 返回 0-11 的月份索引，因此需要加 1

        const handleButtonClick = (id, classprice) => {
          const detail = id;
          const type = 'Class';
          const price = classprice;
          const userId = '67d7cff0159b3e97b515661f';

          fetch('http://localhost:3030/danceclass/bookingClass', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // 設置內容類型為 JSON
            },
            body: JSON.stringify({
              detail,  // 傳送 detail（課程 ID）
              price,   // 傳送 price（價格）
              type,    // 傳送類型
              userId,  // 傳送用戶 ID
            }),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('預訂課程失敗');
              }
            })
            .then((data) => {
              console.log('預訂成功：', data);
              // 成功後處理邏輯（如顯示成功訊息或更新畫面）
            })
            .catch((error) => {
              console.error('錯誤：', error);
              // 處理錯誤（如顯示錯誤訊息）
            });

        };
        return (
          <div
            key={element._id} // React 渲染列表需要唯一的 key
            className="flex items-center bg-zinc-800 rounded-sm overflow-hidden hover:opacity-50 transition-opacity duration-100"
          >
            <div className="w-24 h-24 shrink-0">
              <img
                src={element.img}
                alt={showcaseData.someOneTeacher.nickname}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex items-center justify-between p-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold">{date.getDate()}</div>{" "}
                  {/* 獲取日期 */}
                  <div className="text-sm">{month}月</div> {/* 獲取月份 */}
                </div>
                <div>
                  <div className="text-xl font-bold">
                    {element.style} - {showcaseData.someOneTeacher.nickname}
                  </div>
                  <div className="text-sm text-gray-300">
                    {element.startTime} - {element.endTime} • {element.room}
                  </div>
                </div>
              </div>
              <button
                className="border border-white text-white px-4 py-2 hover:bg-white hover:text-black transition duration-200 cursor-pointer"
                onClick={() => handleButtonClick(element._id, element.price)}
              >
                Book This Class
              </button>
            </div>
          </div>
        );
      });
    }
    return null; // 如果沒有資料，返回 null
  };

  return (
    <div className="bg-zinc-700 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {renderContent()}
      </div>
    </div>
  );
}
