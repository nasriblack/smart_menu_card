import Lottie, { Options } from "react-lottie";

type Props = {
  defaultOptions: Options;
};

const LoadingLottie = ({ defaultOptions }: Props) => {
  return (
    <div className="text-white text-center py-12">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default LoadingLottie;
