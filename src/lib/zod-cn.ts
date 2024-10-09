import i18next from "i18next";
import { FieldErrors, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
// Import your language translation files
import translation from "zod-i18n-map/locales/zh-CN/zod.json";

// lng and resources key depend on your locale.
i18next.init({
  lng: "es",
  resources: {
    es: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

export class ValidationError<T extends FieldValues> extends Error {
  constructor(public errors: FieldErrors<T>, public defaultValues: Record<any, any>) {
    super();
    this.errors = errors;
    this.defaultValues = defaultValues;
  }

  public getErrors(): FieldErrors<T> {
    return this.errors;
  }

  public getDefaultValues(): Record<any, any> {
    return this.defaultValues;
  }
}

// export configured zod instance
export { z }