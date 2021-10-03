import React from "react";

interface Props {
  tabs: Array<{
    title: string;
    view: any;
  }>;
}

const TabbedView: React.FC<Props> = ({ tabs }) => {
  const [currentTab, setCurrentTab] = React.useState(0);

  return (
    <div>
      <div className="flex items-center">
        {tabs.map((tab, index) => {
          return (
            <>
              <h3
                className={`text-xl mb-5 cursor-pointer border-b-2 ${
                  currentTab === index
                    ? "border-loopring-blue"
                    : "border-transparent"
                }`}
                onClick={() => setCurrentTab(index)}
              >
                {tab.title}
              </h3>
              {index !== tabs.length - 1 && (
                <div className="h-6 w-0.5 mx-2 mb-5 bg-loopring-gray" />
              )}
            </>
          );
        })}
      </div>
      <div className="w-full h-full">
        {tabs.map((tab, index) => {
          return (
            <div className={`${currentTab === index ? "visible" : "hidden"}`}>
              {tab.view}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabbedView;
