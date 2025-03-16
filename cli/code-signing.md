# Code Signing for CodePush

Code Signing ensures that updates deployed via Revopush are secure and verified. Follow these steps to set up Code Signing:

## 1. Generate a Signing Key

**Create private and public keys using OpenSSL:**

```shell
# generate private RSA key and write it to private.pem file
openssl genrsa -out private.pem

# export public key from private.pem into public.pem
openssl rsa -pubout -in private.pem -out public.pem
```

## 2. Configure Revopush CLI

**Specify the path to your private key when releasing updates:**

```shell
revopush release-react <appName> <platform> --privateKeyPath private.pem
```

### 3. Configure Your App

### iOS

**Add the public key to your `Info.plist`:**

- Open your `Info.plist` file.
- Add a new entry:

    ```xml
    <key>CodePushPublicKey</key>
    <string>-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
    -----END PUBLIC KEY-----</string>
    ```

Replace the placeholder with the actual contents of your `public.pem` file.

### Android

**Add the public key to your `strings.xml`:**

- Open `res/values/strings.xml`.
- Add the following entry:

    ```xml
    <string name="CodePushPublicKey">-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
    -----END PUBLIC KEY-----</string>
    ```

Replace the placeholder with the actual contents of your `public.pem` file.
