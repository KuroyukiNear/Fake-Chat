import json

def load_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        # If the file doesn't exist, return an empty list
        data = []
    return data

def save_json_file(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)

def add_data_to_json(json_data, new_data):
    json_data.append(new_data)

if __name__ == "__main__":
    file_path = "./messages.json"
    existing_data = load_json_file(file_path)

    while True:
        sender = input("Sender>> ")
        text = input("Text>> ")

        new_message = {"sender": sender, "text": text}
        add_data_to_json(existing_data, new_message)

        save_json_file(existing_data, file_path)
        print("Message saved.")
