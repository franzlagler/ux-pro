export default function Quizzes() {
  return <div>Unauthorized action</div>;
}

export function getServerSideProps() {
  return {
    redirect: {
      destination: '/topics',
      permanent: false,
    },
  };
}
