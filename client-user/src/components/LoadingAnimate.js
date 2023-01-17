import { Player } from '@lottiefiles/react-lottie-player';

const LoadingAnimate = () => (
    // <div className='loading'>
    //   <div className="lds-grid">
    //     {/* <div></div>
    //     <div></div>
    //     <div></div>
    //     <div></div>
    //     <div></div>
    //     <div></div>
    //     <div></div>
    //     <div></div>
    //     <div></div> */}
    //     <Player
    //       src='https://assets8.lottiefiles.com/packages/lf20_mDiktrg2Ea.json'
    //       className="player"
    //       loop
    //       autoplay
    //       style={{ height: '300px', width: '300px' }}
    //     />
    //   </div>
    // </div>
    <div className='flex aligns-items-center justify-content-center'>
      <Player
            src='https://assets8.lottiefiles.com/packages/lf20_mDiktrg2Ea.json'
            className="player"
            loop
            autoplay
            style={{ height: '300px', width: '300px' }}
      />
    </div>
  );

  export default LoadingAnimate;
