import React from 'react';

type LoadingType = 'inline' | 'div' | 'fullpage' | 'dds';

interface LoadingProps {
  type?: LoadingType;
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ type = 'inline', text = '', className = '' }) => {
  if (type === 'inline') {
    return (
      <span className={`inline-flex items-center gap-2 text-sm text-gray-600 ${className}`}>
        <span
          className="w-4 h-4 rounded-full border-2 border-gray-200 border-t-2 border-t-green-500 animate-spin"
          aria-hidden="true"
        />
        {text ? <span>{text}</span> : null}
      </span>
    );
  }

  if (type === 'div') {
    return (
      <div className={`flex flex-col items-center justify-center p-6 min-h-[160px] ${className}`}>
        <div
          className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-4 border-t-green-500 animate-spin mb-4"
          aria-hidden="true"
        />
        {text ? <div className="text-sm text-gray-600 font-medium">{text}</div> : null}
      </div>
    );
  }

  if (type === 'dds') {
    // DDS: gradient background-ish block with moving light bar (small inline style for keyframes)
    return (
      <>
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
          <div className="w-[320px] h-3 bg-white/10 rounded-full overflow-hidden shadow-lg mb-8 relative">
            <div
              className="absolute top-0 left-[-120px] h-full w-[120px] rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-80"
              style={{ animation: 'ddsMove 1.8s ease-in-out infinite' }}
              aria-hidden="true"
            />
          </div>
          {text ? (
            <div className="text-white text-lg font-semibold tracking-wide">{text}</div>
          ) : (
            <div className="text-white text-lg font-semibold tracking-wide">Loading</div>
          )}
        </div>

        <style>{`
          @keyframes ddsMove {
            0% { left: -120px; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: 320px; opacity: 0; }
          }
        `}</style>
      </>
    );
  }

  // fullpage
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <div
        className="w-14 h-14 rounded-full border-6 border-gray-200 border-t-6 border-t-green-500 animate-spin mb-6"
        aria-hidden="true"
        style={{ borderWidth: 6 }}
      />
      {text ? <div className="text-base font-semibold text-gray-700">{text}</div> : null}
    </div>
  );
};

export default Loading;
