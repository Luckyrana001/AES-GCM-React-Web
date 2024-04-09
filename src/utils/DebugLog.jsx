
function DebugLog(message) {
    if (process.env.NODE_ENV === 'development') {
        console.log(message);
      }
  return null; // This component doesn't render anything to the DOM
};

export default DebugLog;