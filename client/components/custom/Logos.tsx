import { Card2 } from "./Card";

const Logos = () => {
  return (
    <div className="text-center text-white">
      <p className="pt-10 md:pt-0 text-lg font-semibold">
        Empowering Developers, Teams, and Innovators
      </p>
      <p className="pt-4 text-sm">
        Trusted by leading tech organizations and collaborative teams worldwide
      </p>
      <div className="flex items-center justify-center md:gap-10 gap-2 pt-10 flex-wrap">
        <Card2 src="/Logo/l5.png" />
        <Card2 src="/Logo/l4.png" />
        <Card2 src="/Logo/l3.png" />
        <Card2 src="/Logo/l2.png" />
      </div>
      <div className="flex items-center justify-center md:gap-10 gap-2 pt-10 flex-wrap">
        <Card2 src="/Logo/l1.png" />
        <Card2 src="/Logo/l6.png" />
        <Card2 src="/Logo/l7.png" />
        <Card2 src="/Logo/l8.png" />
      </div>
    </div>
  );
};

export default Logos;
