export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  // якщо CoreModule модуль включений в двох і більше місцях
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
