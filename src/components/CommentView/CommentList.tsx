import React from "react";
import CommentView, { CommentViewProps } from "./Comment";

const bages = [
  {
    name: "read",
    src: "https://lh3.googleusercontent.com/ogw/AOLn63HADtscguumy1K7WcYQFGzKCnZLaQa2_f4YwqM66Q=s32-c-mo",
  },
  {
    name: "write",
    src: "https://lh3.googleusercontent.com/ogw/AOLn63HADtscguumy1K7WcYQFGzKCnZLaQa2_f4YwqM66Q=s32-c-mo",
  },
];

/**임시 Comment 생성하는 함수. 아래에서 임시 데이터를 생성하는 함수는 추후 삭제 */
const createComment: (
  username: string | number,
  depth: number
) => CommentViewProps & {
  reply: (CommentViewProps & { reply: [] })[];
} = (username, depth) => {
  return {
    depth,
    username: `${username}`,
    badges: bages,
    profileImgSrc:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    date: "2023-03-31",
    comment: "테스트",
    reply: [],
  };
};

/** dummy data 저장할 배열 */
const dummyComments: (CommentViewProps & { reply: CommentViewProps[] })[] = [];

/** dummy data 생성 */
(function () {
  for (let i = 0; i < 10; i++) {
    dummyComments.push(createComment(`comment-${i}`, 0));
  }
  for (let i = 0; i < 3; i++) {
    dummyComments[0].reply.push(createComment(`reply-${i}`, 1));
  }
  console.log(dummyComments[0].reply);

  for (let i = 0; i < 1; i++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dummyComments[0].reply[0].reply.push(
      createComment(`reply-nested-nested-${i}`, 2)
    );
  }

  for (let i = 0; i < 4; i++) {
    dummyComments[3].reply.push(createComment(`reply-to-third-${i}`, 1));
  }
})();

/** nested object를 1차원 배열로 펼쳐주는 함수 */
function flatten(into: any[], node: { [key: string]: any }) {
  const { reply, ...rest } = node;
  into.push(rest);
  if (reply.length) return reply.reduce(flatten, into);
  return into;
}

/** dummy Data에 flatten 함수 적용해서 서버에서 받아온 데이터를 UI에 적용할 수 있는 형태로 변형 */
const completeFlatten = dummyComments.reduce((prev, comment) => {
  const flattenComments = flatten([], comment);
  const result = prev.concat(flattenComments);
  return result;
}, []);

console.log(completeFlatten);

function CommentList() {
  const datas = completeFlatten as never as CommentViewProps[];
  return <section></section>;
}

export default CommentList;
