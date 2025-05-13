export function stringToColor(string: string) {
  let hash = 0;
  let i;
  if (!string) return "#000000";

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(
  name: string = "",
  style: any = {
    width: 30,
    height: 30,
    fontSize: 14,
  }
) {
  const names: string[] = name.split(" ");
  const usableNames = () => {
    if (names.length > 1) {
      return [names[0], names.pop()];
    } else if (names.length == 1) {
      return [names[0]];
    } else {
      return [];
    }
  };
  return {
    sx: {
      bgcolor: stringToColor(name),
      ...style,
    },
    children: `${
      usableNames()
        ?.map((s) => s?.charAt(0))
        ?.join("")
        ?.toLocaleUpperCase() ?? ""
    }`,
  };
}
