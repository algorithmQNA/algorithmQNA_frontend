import React from 'react';

function AdminTableRowSkeleton() {
  return (
    <div className={`p-4 gap-1.5 bg-box-bg border-border relative`}>
      <div
        className={'flex flex-row justify-between h-full w-full animate-pulse'}
      >
        <div>
          <div className={'w-[300px] h-4 bg-gray-300 rounded-md mb-4'} />
          <div className={'w-1/2 h-4 text-xs bg-gray-300 rounded-md'} />
        </div>
        <div className="text-right absolute bottom-4 right-4 w-16 h-4 rounded-md bg-gray-300" />
      </div>
    </div>
  );
}

export default AdminTableRowSkeleton;
