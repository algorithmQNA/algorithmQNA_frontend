import { atom } from 'recoil';
import { GENERAL_COMMENT, PINNED_COMMENT } from '../../constants/CommentType';

type HighlightStatusType = {
  commentId: number;
  highlightingMode: boolean;
  commentType: typeof GENERAL_COMMENT | typeof PINNED_COMMENT;
};

const HighlightStatusAtom = atom<HighlightStatusType>({
  key: 'highlight-status',
  default: {
    commentId: -1,
    highlightingMode: false,
    commentType: GENERAL_COMMENT,
  },
});

export default HighlightStatusAtom;
