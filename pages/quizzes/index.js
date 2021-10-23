export default function Quizzes() {
  return 0;
}

export function getServerSideProps() {
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}
