import dom from '../../main/./transpiler';

export const ThemeSelector = () => {
  const changeTheme = (theme) => {
    console.log("Called");
     $("#root").removeClass();
     $("#root").addClass(theme);
  };
  return (
    <select onChange={(event) => changeTheme(this.options[this.selectedIndex].value)}>
      <option value="theme-standard">Standard</option>
      <option value="theme-high-contrast">High Contrast</option>
    </select>
  )
}