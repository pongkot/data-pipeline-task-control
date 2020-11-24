export class Helper {
  static getActionState(
    state: string,
    actions: Array<{ action_type: string; value: string }>,
  ): string {
    if (actions) {
      const found: Array<{
        action_type: string;
        value: string;
      }> = actions.filter(
        (action: { action_type: string; value: string }) =>
          action.action_type === state,
      );

      if (found.length > 0) {
        return found
          .map((item: { action_type: string; value: string }) =>
            parseInt(item.value),
          )
          .reduce((acc: number, curr: number) => acc + curr)
          .toString();
      } else {
        return '0';
      }
    } else {
      return '0';
    }
  }

  static getNumber(value: any): number {
    let result: number;
    if (typeof value === 'string' && parseInt(value)) {
      result = parseInt(value);
    } else if (typeof value === 'number') {
      result = value;
    } else {
      return -1;
    }
    return result;
  }

  static getArrayString(content: string, separator = ';'): Array<string> {
    return content.split(separator);
  }
}
