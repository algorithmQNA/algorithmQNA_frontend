import React from 'react';
import MessageBox from './MessageBox';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    console.log('에러', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return (
        <MessageBox msg="🫤 네트워크 에러가 발생했어요">
          <p className="font-thin text-sm">새로고침을 시도해주세요</p>
        </MessageBox>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
