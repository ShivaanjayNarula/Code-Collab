import { BsSpeedometer2 } from "react-icons/bs";
import { Card4 } from "./Card";

const Features2 = () => {
  return (
    <div className="bg-img2 pt-10 md:p-20 md:pl-40 pl-10">
      <p className="md:text-6xl text-4xl ">
        Enhance your team&#39;s productivity. <br />
        Collaborate in real-time.
      </p>

      <div className="flex md:gap-56 gap-10 md:pt-6 pt-5 flex-col md:flex-row">
        <div className="flex md:gap-20 gap-16 flex-col md:pt-10">
          <Card4
            description={
              <div>
                Effortlessly write and edit code together with your team in
                real-time.
              </div>
            }
            logo={<BsSpeedometer2 />}
            title="Real-time collaboration"
          ></Card4>
          <Card4
            description={
              <div>
                Quickly identify and fix issues in the code, ensuring a smooth
                development process.
              </div>
            }
            logo={<BsSpeedometer2 />}
            title="Instant debugging"
          ></Card4>
          <Card4
            description={
              <div>
                Seamlessly manage and optimize your projects with easy-to-use
                tools.
              </div>
            }
            logo={<BsSpeedometer2 />}
            title="Project management"
          ></Card4>
        </div>
        <div className="flex md:gap-20 gap-16 flex-col md:pt-10">
          <Card4
            description={
              <div>
                Visualize code performance and metrics in real-time for
                efficient decision-making.
              </div>
            }
            logo={<BsSpeedometer2 />}
            title="Real-time code metrics"
          ></Card4>
          <Card4
            description={
              <div>
                Set and track goals for your code collaboration projects with
                ease.
              </div>
            }
            logo={<BsSpeedometer2 />}
            title="Collaboration goal setting"
          ></Card4>
          <Card4
            description={
              <div>
                Optimize your collaborative environment with quick tools and
                feedback loops.
              </div>
            }
            logo={<BsSpeedometer2 />}
            title="Code optimization tools"
          ></Card4>
        </div>
        <div className="flex md:gap-20 gap-16 flex-col md:pt-10">
          <Card4
            description={
              <div>
                Instantly test and deploy your code with automated processes for
                fast results.
              </div>
            }
            logo={<BsSpeedometer2 />}
            title="Instant code deployment"
          ></Card4>
          <Card4
            description={
              <div>
                Stay updated with live notifications on changes, edits, and team
                activities.
              </div>
            }
            logo={<BsSpeedometer2 />}
            title="Live activity feed"
          ></Card4>
          <Card4
            description={
              <div>
                Work together without interruptions and keep track of team
                progress seamlessly.
              </div>
            }
            logo={<BsSpeedometer2 />}
            title="Team progress tracking"
          ></Card4>
        </div>
      </div>
    </div>
  );
};

export default Features2;
