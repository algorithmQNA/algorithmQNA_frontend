import React, { ReactNode } from 'react';
import { BsArrowReturnRight } from 'react-icons/bs';

interface CommentWrapperProps {
  children: ReactNode;
  depth: number;
}

/** depth에 따른 margin 값*/
const marginLeft: { [key: string]: string } = {
  0: 'ml-0',
  1: 'ml-2 md:ml-6',
  2: 'ml-4 md:ml-12',
  3: 'ml-6 md:ml-18',
};

/** depth에 따라  */
function CommentWrapper({ children, depth }: CommentWrapperProps) {
  const isRoot = !depth;
  return (
    <div
      className={`${marginLeft[depth]} flex flex-row my-4 gap-2 [&>svg]:shrink-0`}
    >
      {!isRoot && <BsArrowReturnRight className="text-gray-500" />}
      {children}
    </div>
  );
}

export default CommentWrapper;
