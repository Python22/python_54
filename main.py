# class Student:
#     def __init__(self, name, age, gender="male"):
#         self.name = name                    # public
#         self._age = age                     # protected
#         self.__gender = gender              # private
#
#     @classmethod
#     def say_hello(cls):
#         print("hi!!!!")
#
#     def set_age(self, value):
#         if value < 0:
#             raise "Возраст не может быть отрицательным!!!"
#         self._age = value
#
#
#
# vasya = Student(name="Vasya", age=21)
# vasya2 = Student(name="Vasya2", age=2123)
# vasya3 = Student(name="Vasya2", age=2123)
# print(vasya)
# vasya.say_hello()
# Student.say_hello()
# #
# # print(vasya.name)
# # print(vasya._age)
# # vasya._age = 25
# # print(vasya._age)
# # print(vasya.__gender)
#
# # vasya.set_age(-25)
#


class Animal:
    def __init__(self, name="Noname", age=0):
        self.name = name
        self.age = age

    def run(self): pass
    def sleep(self): pass
    def eat(self): pass


class Dog(Animal):
    def __init__(self, name="Noname", age=0, weight=0):
        super().__init__(name, age)
        self.weight = weight

    def run(self):
        print("dog (${this.name}) is running!!!")
