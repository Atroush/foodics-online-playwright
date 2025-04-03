export class Helper {
   
    public  appendDateTime(inputString): string {
      const currentDateTime = new Date().toISOString().replace(/[-T:.Z]/g, ''); // Format: YYYYMMDDHHMMSS
      return `${inputString}_${currentDateTime}`;
    }
  }
  