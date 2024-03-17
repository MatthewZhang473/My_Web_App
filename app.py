from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__, static_url_path='/static')


# Initialize tasks list with a dictionary structure to hold both task text and priority
tasks = []

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/add', methods=['POST'])
def add():
    task = request.form['task']
    # Default priority is the length of the tasks list
    priority = len(tasks)
    tasks.append({'task': task, 'priority': priority})
    return redirect(url_for('index'))

@app.route('/delete/<int:index>', methods=['POST'])
def delete(index):
    del tasks[index]
    # After deleting, update priorities of remaining tasks
    for i, task in enumerate(tasks):
        task['priority'] = i
    return redirect(url_for('index'))

@app.route('/swap/<int:index>', methods=['POST'])
def swap(index):
    # Swap the task with the one above it
    if index > 0:
        tasks[index], tasks[index - 1] = tasks[index - 1], tasks[index]
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
