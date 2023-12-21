const API_KEY = 'DDkPTP8vbarqezj7q7D8jOHXMjZzB654zu1wc3oYNbwFYOOXZVL';
import { logWithLabel } from '../utils/console';
import axios, { AxiosResponse } from 'axios';


export class LicenceAuth {
  private urlSecret: string;
  private licenceKey: string;
  private version: number;
  private name: string;

  constructor(licenceKey: string, urlSecret: string, version: number, name: string) {
    this.licenceKey = licenceKey;
    this.urlSecret = urlSecret;
    this.version = version;
    this.name = name;
  }

  private async validateLicence(response: AxiosResponse<any>): Promise<boolean> {
    if (response.data?.status_overview === 'success' && response.data?.status_code === 200) {
      logWithLabel('licence', 'Licence key is valid');
      return true;
    } else {
      logWithLabel('licence', 'Licence key is not valid');
      return false;
    }
  }

  public async performLicenceValidation(): Promise<void> {
    try {
      const response = await axios.post(
        this.urlSecret,
        {
          licenceKey: this.licenceKey,
          version: this.version,
          product: this.name,
        },
        {
          headers: { Authorization: API_KEY },
        }
      );

      const isValid = await this.validateLicence(response);

      if (!isValid) {
        logWithLabel('licence', 'Licence key is not valid or an error occurred during licence validation');
        process.exit(1); // Exiting might be too drastic, consider an alternative handling mechanism
      }

      logWithLabel('licence', 'Licence key is valid and has been successfully validated');
    } catch (error) {
      logWithLabel('licence', 'An error occurred during licence validation');
      // Consider handling the error in an appropriate manner instead of exiting the process
      process.exit(1); // Exiting might be too drastic, consider an alternative handling mechanism
    }
  }
}
