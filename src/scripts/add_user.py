from getpass import getpass

from db import users


if __name__ == "__main__":
    print("Press Ctrl+C to abort.")
    try:
        username = input("Set username: ")

        while True:
            password = getpass("Set a password: ")
            verified = getpass("Verify your password: ")
            if password == verified:
                break
            print("Passwords don't match.")

        users.add(username, password)
        print("Succesfully added user!")

    except KeyboardInterrupt:
        print("\nAborted.")
