export interface Directory {
  name: string;
  size: number;
}

export const calculateDirSize = (
  input: string[],
  currentDirs: Directory[],
  finalDirs: Directory[],
  isKeepable: (dir: Directory) => boolean,
): Directory[] => {
  if (input.length === 0) return [...finalDirs, ...currentDirs.filter(isKeepable)];

  const [head, tail] = [input[0], input.slice(1)];

  if (head.startsWith('$ ls') || head.startsWith('dir'))
    return calculateDirSize(tail, currentDirs, finalDirs, isKeepable);

  if (head.startsWith('$ cd')) {
    const newDir: Directory = {
      name: head.slice(4).trim(),
      size: 0,
    };

    const newDirs =
      newDir.name === '..' || newDir.name === '/'
        ? newDir.name === '..'
          ? currentDirs.slice(1) // Go up a dir
          : currentDirs.filter((dir) => dir.name === '/') // Go to root
        : [newDir, ...currentDirs]; // Add dir

    // Check if dir is worth keeping
    if (newDir.name === '..') {
      const removedDir = currentDirs[0];
      if (isKeepable(removedDir)) {
        return calculateDirSize(tail, newDirs, [removedDir, ...finalDirs], isKeepable);
      }
    }

    return calculateDirSize(tail, newDirs, finalDirs, isKeepable);
  }

  // Line must start with number
  const fileSize = head.split(' ')[0];

  const newDirs = currentDirs.map((dir) => ({
    name: dir.name,
    size: dir.size + Number.parseInt(fileSize, 10),
  }));

  return calculateDirSize(tail, newDirs, finalDirs, isKeepable);
};
