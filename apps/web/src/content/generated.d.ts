// Single ambient module declarations for JSON imports (if you use them)
declare module '@content/profile/profile.json' {
  type ProfileJson = typeof import('../profile/profile.json');
  const value: ProfileJson;
  export default value;
}
declare module '@content/education/education.json' {
  type EducationJson = typeof import('../education/education.json');
  const value: EducationJson;
  export default value;
}
declare module '@content/languages/languages.json' {
  type LanguagesJson = typeof import('../languages/languages.json');
  const value: LanguagesJson;
  export default value;
}
// Only module declarations with correct typeof import, never relative .d.ts references.
