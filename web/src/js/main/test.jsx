import dom from './transpiler';

export const forkster = () => {
  const ar = ['fork', 'blarg', 'things'];
  return (
    <div>
      <p>Lorem Ipsum</p>
      {ar.map(s => (
        <p>{s}</p>
      ))}
    </div>
  );
};
