import scipy


def clean_data_positive(df, columnCount):
    for i in range(0, columnCount):
        df.loc[df[f"Sensor{i}"] < 255, f"Sensor{i}"] = 0
        df.loc[df[f"Sensor{i}"] > 768, f"Sensor{i}"] = 0
        df.loc[
            (df[f"Sensor{i}"] >= 255) & (df[f"Sensor{i}"] <= 768), f"Sensor{i}"
        ] -= 255
    return df


def peak_detection(df):
    sensor_data = []
    peak_indices = []
    steps = []
    for i in range(6):
        sensor_data.append(df[f"Sensor{i}"])
    for sensor in sensor_data:
        peak_indices.append(
            scipy.signal.find_peaks(sensor, height=None, distance=3)[0].tolist()
        )
    heel_index = 1

    while len(peak_indices[2]) > heel_index:
        indices = [0 for _ in range(6)]
        current_step = {i: [] for i in range(6)}
        low_peak = peak_indices[2][heel_index - 1]
        high_peak = peak_indices[2][heel_index]
        for index, peak in enumerate(peak_indices):
            while len(peak) > indices[index] and peak[indices[index]] < high_peak:
                if peak[indices[index]] >= low_peak:
                    current_step[index].append(peak[indices[index]])
                indices[index] += 1

        steps.append(current_step)
        heel_index += 1

    return steps


def clean_up_steps(steps):
    cleaned_steps = []
    for step in steps:

        add_step = True
        list_of_lists = [list(value) for value in step.values()]
        for sensor_value in list_of_lists:
            if len(sensor_value) != 1:
                add_step = False
                break
        if add_step:
            cleaned_steps.append(step)
    return cleaned_steps


def average_step(df, steps):
    average_step = {i: 0 for i in range(6)}
    for step in steps:
        for i in range(6):
            heel_time = df["Timestamp"][step[2]].values[0].astype(int)
            if i != 2 and len(df["Timestamp"][step[i]].values) > 0:
                time_stamp = df["Timestamp"][step[i]].values[0].astype(int)
                average_step[i] += time_stamp - heel_time
    for step in average_step:
        average_step[step] = average_step[step] / len(steps)
    return average_step
