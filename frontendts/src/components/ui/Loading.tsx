import React from 'react';

type LoadingType = 'inline' | 'div' | 'fullpage' | 'hscreen';

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
      <div className={`flex flex-col items-center justify-center p-6 min-h-40 ${className}`}>
        <div
          className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-4 border-t-green-500 animate-spin mb-4"
          aria-hidden="true"
        />
        {text ? <div className="text-sm text-gray-600 font-medium">{text}</div> : null}
      </div>
    );
  }

  if (type === 'hscreen') {
    return (
      <div className={`flex flex-col items-center justify-center h-screen w-full ${className}`}>
        <div
          className="w-14 h-14 rounded-full border-6 border-gray-200 border-t-6 border-t-green-500 animate-spin mb-6"
          aria-hidden="true"
          style={{ borderWidth: 6 }}
        />
        {text ? <div className="text-base font-semibold text-gray-700">{text}</div> : null}
      </div>
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
